// svelteam/marco-2/src/routes/projetos/[id]/+page.ts
import type { PageLoad } from './$types';
import type { Projeto } from '../../../tipos';

export const load: PageLoad = async ({ fetch, params }) => {
    // A propriedade params contém os parâmetros da URL. Como a pasta se chama [id], acessamos com params.id
    const id = params.id;
    const resposta = await fetch(`http://localhost:3000/projetos/${id}`); 
    
    // Se a API retornar erro (ex: projeto não existe), o SvelteKit automaticamente mostra aquela tela de 404 que criamos!
    if (!resposta.ok) {
        throw new Error('Projeto não encontrado');
    }

    const projeto: Projeto = await resposta.json();

    return {
        projeto
    };
};