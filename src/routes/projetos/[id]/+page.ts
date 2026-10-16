// svelteam/marco-2/src/routes/projetos/[id]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { buscarProjetoComTarefas } from '../../../lib/api';

export const load: PageLoad = async ({ fetch, params }) => {
	// A propriedade params contém os parâmetros da URL. Como a pasta se chama [id], acessamos com params.id
	// _embed=tarefas traz o projeto já com as tarefas dele (filtrar por projetoId volta vazio no json-server)
	const projeto = await buscarProjetoComTarefas(params.id, fetch);

	// error(404) faz o SvelteKit mostrar a página de erro com status 404.
	// (throw new Error sempre vira erro 500)
	if (!projeto) {
		error(404, `Projeto ${params.id} não encontrado`);
	}

	return {
		projeto
	};
};
