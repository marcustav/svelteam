// src/derivar.ts
// Funções puras de TypeScript: nenhuma linha importa Svelte.
// A lista e o quadro chamam as mesmas funções, dentro de um $derived.
import type { Prioridade, Status, Tarefa } from './tipos'

// O tipo Filtros é da tela, não do contrato com a API: por isso mora aqui, e não no tipos.ts.
export interface Filtros {
	busca: string
	status: Status | 'todos'
	prioridade: Prioridade | 'todas'
}

export const FILTROS_INICIAIS: Filtros = { busca: '', status: 'todos', prioridade: 'todas' }

// Ordem fixa das colunas do quadro. Também serve para montar os <select>.
export const STATUS: Status[] = ['a-fazer', 'em-andamento', 'em-revisao', 'concluida']
export const PRIORIDADES: Prioridade[] = ['alta', 'media', 'baixa']

export const ROTULOS_STATUS: Record<Status, string> = {
	'a-fazer': 'A fazer',
	'em-andamento': 'Em andamento',
	'em-revisao': 'Em revisão',
	concluida: 'Concluída'
}

export const ROTULOS_PRIORIDADE: Record<Prioridade, string> = {
	alta: 'Alta',
	media: 'Média',
	baixa: 'Baixa'
}

// Busca por título + filtro de status + filtro de prioridade, combinados com &&.
export function filtrarTarefas(tarefas: Tarefa[], f: Filtros): Tarefa[] {
	const termo = f.busca.trim().toLocaleLowerCase('pt-BR')
	return tarefas.filter(
		(t) =>
			t.titulo.toLocaleLowerCase('pt-BR').includes(termo) &&
			(f.status === 'todos' || t.status === f.status) &&
			(f.prioridade === 'todas' || t.prioridade === f.prioridade)
	)
}

// STATUS.map devolve sempre as quatro colunas, na mesma ordem, mesmo vazias
// (o Object.groupBy só criaria coluna para status que tem tarefa).
export function agruparPorStatus(tarefas: Tarefa[]): { status: Status; tarefas: Tarefa[] }[] {
	return STATUS.map((status) => ({
		status,
		tarefas: tarefas.filter((t) => t.status === status)
	}))
}
