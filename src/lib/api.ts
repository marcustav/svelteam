import type { Projeto, Tarefa, NovaTarefa } from '../tipos'
import { ErroApi } from './erros'

// Endereço da API local (json-server). No Marco 6 isso vai para uma variável de ambiente.
const API = 'http://localhost:3000'

// Se a API não responder nesse tempo, desistimos e avisamos o usuário
// (sem isso, o botão ficaria em "Salvando..." para sempre).
const TEMPO_LIMITE_MS = 8000

// Projeto com as tarefas dentro, como o json-server devolve com ?_embed=tarefas
export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] }

// Projeto ainda sem id (quem gera o id é a API), no mesmo padrão de NovaTarefa
export type NovoProjeto = Omit<Projeto, 'id'>

// O SvelteKit entrega um fetch próprio dentro da função load.
// Recebemos ele por parâmetro; fora do load, usa o fetch normal do navegador.
type Fetch = typeof fetch

// Todas as chamadas passam por aqui. Transforma qualquer falha num ErroApi com o tipo certo
// (rede, tempo ou http), para a tela escolher a mensagem. 404 só volta como resposta
// quando aceitar404 = true (buscas que tratam "não encontrado" como null).
async function requisitar(
	caminho: string,
	f: Fetch,
	opcoes: RequestInit = {},
	aceitar404 = false
): Promise<Response> {
	const metodo = opcoes.method ?? 'GET'
	let resposta: Response
	try {
		resposta = await f(`${API}${caminho}`, {
			...opcoes,
			signal: AbortSignal.timeout(TEMPO_LIMITE_MS)
		})
	} catch (erro) {
		// AbortSignal.timeout dispara um erro com name 'TimeoutError'; o resto é falha de rede
		if (erro instanceof Error && erro.name === 'TimeoutError') {
			throw new ErroApi('tempo', `Tempo esgotado em ${metodo} ${caminho}`)
		}
		throw new ErroApi('rede', `Sem resposta da API em ${metodo} ${caminho}`)
	}

	if (!resposta.ok && !(aceitar404 && resposta.status === 404)) {
		throw new ErroApi('http', `HTTP ${resposta.status} em ${metodo} ${caminho}`, resposta.status)
	}
	return resposta
}

async function pegar<T>(caminho: string, f: Fetch): Promise<T> {
	const resposta = await requisitar(caminho, f)
	return resposta.json() as Promise<T>
}

async function pegarOuNulo<T>(caminho: string, f: Fetch): Promise<T | null> {
	const resposta = await requisitar(caminho, f, {}, true)
	if (resposta.status === 404) return null
	return resposta.json() as Promise<T>
}

// Escrita (Marco 3): envia JSON com POST (criar) ou PATCH (alterar só os campos enviados)
// e devolve o registro como a API gravou, já com o id.
async function enviar<T>(metodo: 'POST' | 'PATCH', caminho: string, corpo: unknown, f: Fetch): Promise<T> {
	const resposta = await requisitar(caminho, f, {
		method: metodo,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(corpo)
	})
	return resposta.json() as Promise<T>
}

// ---------- Tarefas ----------

export function listarTarefas(f: Fetch = fetch): Promise<Tarefa[]> {
	return pegar<Tarefa[]>('/tarefas', f)
}

export function buscarTarefa(id: string, f: Fetch = fetch): Promise<Tarefa | null> {
	return pegarOuNulo<Tarefa>(`/tarefas/${encodeURIComponent(id)}`, f)
}

// Cria uma tarefa. Recebe NovaTarefa (sem id); a API gera o id e devolve a Tarefa completa.
export function criarTarefa(dados: NovaTarefa, f: Fetch = fetch): Promise<Tarefa> {
	return enviar<Tarefa>('POST', '/tarefas', dados, f)
}

// Atualiza só os campos enviados (PATCH). O id nunca muda, por isso não entra nos dados.
export function atualizarTarefa(
	id: string,
	dados: Partial<NovaTarefa>,
	f: Fetch = fetch
): Promise<Tarefa> {
	return enviar<Tarefa>('PATCH', `/tarefas/${encodeURIComponent(id)}`, dados, f)
}

// Exclusão (Marco 5): DELETE apaga a tarefa na API.
// O json-server devolve a tarefa apagada, mas a tela não precisa dela, por isso não retorna nada.
export async function excluirTarefa(id: string, f: Fetch = fetch): Promise<void> {
	await requisitar(`/tarefas/${encodeURIComponent(id)}`, f, { method: 'DELETE' })
}

// ---------- Projetos ----------

export function listarProjetos(f: Fetch = fetch): Promise<Projeto[]> {
	return pegar<Projeto[]>('/projetos', f)
}

export function buscarProjeto(id: string, f: Fetch = fetch): Promise<Projeto | null> {
	return pegarOuNulo<Projeto>(`/projetos/${encodeURIComponent(id)}`, f)
}

export function criarProjeto(dados: NovoProjeto, f: Fetch = fetch): Promise<Projeto> {
	return enviar<Projeto>('POST', '/projetos', dados, f)
}

export function atualizarProjeto(
	id: string,
	dados: Partial<NovoProjeto>,
	f: Fetch = fetch
): Promise<Projeto> {
	return enviar<Projeto>('PATCH', `/projetos/${encodeURIComponent(id)}`, dados, f)
}

// Filtrar /tarefas?projetoId=1 devolve lista vazia (o json-server lê 1 como número),
// por isso as tarefas de um projeto vêm pelo _embed.
export function buscarProjetoComTarefas(
	id: string,
	f: Fetch = fetch
): Promise<ProjetoComTarefas | null> {
	return pegarOuNulo<ProjetoComTarefas>(`/projetos/${encodeURIComponent(id)}?_embed=tarefas`, f)
}
