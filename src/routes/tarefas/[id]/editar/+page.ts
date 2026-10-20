// src/routes/tarefas/[id]/editar/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { buscarTarefa, listarProjetos } from '$lib/api';

export const load: PageLoad = async ({ params, fetch }) => {
	// Busca a tarefa a editar e os projetos para o seletor em paralelo
	const [tarefa, projetos] = await Promise.all([
		buscarTarefa(params.id, fetch),
		listarProjetos(fetch)
	]);

	if (!tarefa) {
		error(404, `Tarefa ${params.id} não encontrada`);
	}

	return {
		tarefa,
		projetos
	};
};