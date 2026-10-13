<!-- svelteam/marco-2/src/routes/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';

    // Sintaxe moderna do Svelte 5
    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Lista de Tarefas</title>
</svelte:head>

<main>
    <h1>Minhas Tarefas</h1>

    <div class="grid-tarefas">
        <!-- O (tarefa.id) garante que o ID seja a chave, como pedido na issue -->
        {#each data.tarefas as tarefa (tarefa.id)}
            <article class="cartao">
                <div class="cabecalho-cartao">
                    <h2>{tarefa.titulo}</h2>
                    <span class="status {tarefa.status}">{tarefa.status.replace('-', ' ')}</span>
                </div>
                
                <p class="descricao">{tarefa.descricao}</p>
                
                <div class="rodape-cartao">
                    <small>Prioridade: <strong>{tarefa.prioridade}</strong></small>
                    <small>Resp: <strong>{tarefa.responsavel}</strong></small>
                </div>

                <div class="acoes">
                    <a href="/tarefas/{tarefa.id}" class="btn-detalhes">Ver detalhes</a>
                </div>
            </article>
        {:else}
            <p>Nenhuma tarefa encontrada.</p>
        {/each}
    </div>
</main>

<style>
    main {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
        font-family: sans-serif;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
    }

    .grid-tarefas {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .cartao {
        background-color: #fff;
        border: 1px solid #eaeaea;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .cabecalho-cartao {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    .cartao h2 {
        margin: 0;
        font-size: 1.2rem;
        color: #2c3e50;
    }

    .status {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        text-transform: capitalize;
        white-space: nowrap;
    }

    .status.a-fazer { background-color: #e2e8f0; color: #475569; }
    .status.em-andamento { background-color: #fef08a; color: #854d0e; }
    .status.em-revisao { background-color: #fed7aa; color: #c2410c; }
    .status.concluida { background-color: #bbf7d0; color: #166534; }

    .descricao {
        color: #666;
        margin: 0;
        flex-grow: 1;
    }

    .rodape-cartao {
        display: flex;
        justify-content: space-between;
        background-color: #f8f9fa;
        padding: 0.5rem;
        border-radius: 4px;
        color: #555;
    }

    .acoes {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.5rem;
    }

    .btn-detalhes {
        background-color: #3498db;
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: bold;
    }
</style>