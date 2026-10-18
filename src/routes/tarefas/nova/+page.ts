// src/routes/tarefas/nova/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
    // Pega o ID do projeto da URL, se existir (ex: /tarefas/nova?projetoId=1)
    const projetoSelecionadoId = url.searchParams.get('projetoId');

    // Busca os projetos na API para montar as opções do <select>
    const res = await fetch('http://localhost:3000/projetos');
    const projetos = await res.json();

    return {
        projetos,
        projetoSelecionadoId
    };
};