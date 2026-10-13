import { error } from '@sveltejs/kit'
import { buscarProjetoComTarefas } from '../../../lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	const projeto = await buscarProjetoComTarefas(params.id, fetch)
	if (!projeto) error(404, `Projeto ${params.id} não encontrado`)
	return { projeto }
}
