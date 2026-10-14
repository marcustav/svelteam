// svelteam/marco-2/src/routes/projetos/+page.ts
import type { PageLoad } from './$types';
import type { Projeto } from '../../tipos';

export const load: PageLoad = async ({ fetch }) => {
    // Busca os projetos no db.json
    const resposta = await fetch('http://localhost:3000/projetos'); 
    
    if (!resposta.ok) {
        throw new Error('Falha ao carregar os projetos');
    }

    const projetos: Projeto[] = await resposta.json();

    return {
        projetos
    };
};