// svelteam/marco-2/src/routes/projetos/+page.ts
import type { PageLoad } from './$types';
import { listarProjetos } from '../../lib/api';

export const load: PageLoad = async ({ fetch }) => {
	// Busca os projetos pelo módulo de acesso à API (item 7)
	const projetos = await listarProjetos(fetch);

	return {
		projetos
	};
};
