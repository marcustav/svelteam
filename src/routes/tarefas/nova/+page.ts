// src/routes/tarefas/nova/+page.ts
import type { PageLoad } from './$types';
import { listarProjetos } from '$lib/api';

export const load: PageLoad = async ({ url, fetch }) => {
	// Pega o ID do projeto da URL, se existir (ex: /tarefas/nova?projetoId=1)
	const projetoSelecionadoId = url.searchParams.get('projetoId');

	// Busca os projetos pelo módulo de acesso à API, para montar as opções do seletor
	const projetos = await listarProjetos(fetch);

	return {
		projetos,
		projetoSelecionadoId
	};
};