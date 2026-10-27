// src/routes/quadro/+page.ts
import type { PageLoad } from './$types';
import { listarTarefas } from '../../lib/api';

export const load: PageLoad = async ({ fetch }) => {
	const tarefas = await listarTarefas(fetch);

	return {
		tarefas
	};
};
