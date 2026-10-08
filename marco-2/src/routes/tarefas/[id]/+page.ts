import { error } from '@sveltejs/kit'
import { buscarTarefa } from '../../../lib/api'
import type { PageLoad } from './$types'

// Roda antes de a página aparecer: lê o id da URL e busca a tarefa na API.
export const load: PageLoad = async ({ params, fetch }) => {
	const tarefa = await buscarTarefa(params.id, fetch)

	if (!tarefa) {
		error(404, `Tarefa ${params.id} não encontrada`)
	}

	return { tarefa }
}
