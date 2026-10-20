// src/routes/projetos/[id]/editar/+page.ts
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { buscarProjeto } from '$lib/api'

export const load: PageLoad = async ({ fetch, params }) => {
	// Lê o id da URL (/projetos/2/editar -> params.id = "2") e busca o projeto na API
	const projeto = await buscarProjeto(params.id, fetch)

	if (!projeto) {
		error(404, `Projeto ${params.id} não encontrado`)
	}

	return { projeto }
}
