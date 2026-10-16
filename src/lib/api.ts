import type { Projeto, Tarefa, NovaTarefa } from '../tipos'

// Endereço da API local (json-server). No Marco 6 isso vai para uma variável de ambiente.
const API = 'http://localhost:3000'

// Projeto com as tarefas dentro, como o json-server devolve com ?_embed=tarefas
export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] }

// Projeto ainda sem id (quem gera o id é a API), no mesmo padrão de NovaTarefa
export type NovoProjeto = Omit<Projeto, 'id'>

// O SvelteKit entrega um fetch próprio dentro da função load.
// Recebemos ele por parâmetro; fora do load, usa o fetch normal do navegador.
type Fetch = typeof fetch

async function pegar<T>(caminho: string, f: Fetch): Promise<T> {
	const resposta = await f(`${API}${caminho}`)
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status} em ${caminho}`)
	return resposta.json() as Promise<T>
}

async function pegarOuNulo<T>(caminho: string, f: Fetch): Promise<T | null> {
	const resposta = await f(`${API}${caminho}`)
	if (resposta.status === 404) return null
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status} em ${caminho}`)
	return resposta.json() as Promise<T>
}

// Escrita (Marco 3): envia JSON com POST (criar) ou PATCH (alterar só os campos enviados)
// e devolve o registro como a API gravou, já com o id.
async function enviar<T>(metodo: 'POST' | 'PATCH', caminho: string, corpo: unknown, f: Fetch): Promise<T> {
	const resposta = await f(`${API}${caminho}`, {
		method: metodo,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(corpo)
	})
	if (!resposta.ok) throw new Error(`HTTP ${resposta.status} ao enviar ${metodo} ${caminho}`)
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
