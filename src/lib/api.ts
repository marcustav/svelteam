import type { Projeto, Tarefa } from '../tipos'

// Endereço da API local (json-server). No Marco 6 isso vai para uma variável de ambiente.
const API = 'http://localhost:3000'

// Projeto com as tarefas dentro, como o json-server devolve com ?_embed=tarefas
export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] }

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

// ---------- Tarefas ----------

export function listarTarefas(f: Fetch = fetch): Promise<Tarefa[]> {
	return pegar<Tarefa[]>('/tarefas', f)
}

export function buscarTarefa(id: string, f: Fetch = fetch): Promise<Tarefa | null> {
	return pegarOuNulo<Tarefa>(`/tarefas/${encodeURIComponent(id)}`, f)
}

// ---------- Projetos ----------

export function listarProjetos(f: Fetch = fetch): Promise<Projeto[]> {
	return pegar<Projeto[]>('/projetos', f)
}

export function buscarProjeto(id: string, f: Fetch = fetch): Promise<Projeto | null> {
	return pegarOuNulo<Projeto>(`/projetos/${encodeURIComponent(id)}`, f)
}

// Filtrar /tarefas?projetoId=1 devolve lista vazia (o json-server lê 1 como número),
// por isso as tarefas de um projeto vêm pelo _embed.
export function buscarProjetoComTarefas(
	id: string,
	f: Fetch = fetch
): Promise<ProjetoComTarefas | null> {
	return pegarOuNulo<ProjetoComTarefas>(`/projetos/${encodeURIComponent(id)}?_embed=tarefas`, f)
}
