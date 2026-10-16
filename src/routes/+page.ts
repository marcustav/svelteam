// svelteam/marco-2/src/routes/+page.ts
import type { PageLoad } from './$types';
import { listarTarefas } from '../lib/api';

export const load: PageLoad = async ({ fetch }) => {
	// Usa o módulo de acesso à API (item 7) em vez de chamar o fetch direto
	const tarefas = await listarTarefas(fetch);

	// Retorna os dados que estarão disponíveis na propriedade `data` do +page.svelte
	return {
		tarefas
	};
};
