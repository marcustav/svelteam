// src/routes/tarefas/[id]/editar/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    // Pega o [id] da URL
    const { id } = params;

    // Busca a tarefa específica que vamos editar
    const resTarefa = await fetch(`http://localhost:3000/tarefas/${id}`);
    const tarefa = await resTarefa.json();

    // Busca os projetos para montar as opções do select
    const resProjetos = await fetch('http://localhost:3000/projetos');
    const projetos = await resProjetos.json();

    return {
        tarefa,
        projetos
    };
};