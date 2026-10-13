// svelteam/marco-2/src/routes/+page.ts
import type { PageLoad } from './$types';
import type { Tarefa } from '../tipos';

export const load: PageLoad = async ({ fetch }) => {
    // Se o seu api.ts já estiver configurado, você pode usá-lo aqui.
    // Caso contrário, usamos o fetch padrão do SvelteKit apontando para o db.json
    const resposta = await fetch('http://localhost:3000/tarefas'); 
    
    if (!resposta.ok) {
        throw new Error('Falha ao carregar as tarefas');
    }

    const tarefas: Tarefa[] = await resposta.json();

    // Retorna os dados que estarão disponíveis na propriedade `data` do +page.svelte
    return {
        tarefas
    };
};