 <!-- svelteam/marco-2/src/routes/+page.svelte -->

<script lang="ts">

    import type { PageData } from './$types';

    import TarefaCard from '../lib/components/TarefaCard.svelte';

    import { filtros } from '../lib/filtros.svelte';

    import { filtrarTarefas } from '../derivar';


    let { data }: { data: PageData } = $props();


    // Aplica o filtro global reativamente na lista principal

    let tarefasFiltradas = $derived(filtrarTarefas(data.tarefas, filtros));

</script>


<svelte:head>

    <title>Lista de Tarefas</title>

</svelte:head>


<div class="pagina">

    <h1>Minhas Tarefas</h1>


    <div class="grid-tarefas">

        {#each tarefasFiltradas as tarefa (tarefa.id)}

            <TarefaCard {tarefa} />

        {:else}

            <p>Nenhuma tarefa encontrada com os filtros atuais.</p>

        {/each}

    </div>

</div>


<style>

    h1 {

        text-align: center;

        color: #333;

        margin-bottom: 2rem;

    }


    .grid-tarefas {

        display: grid;

        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

        gap: 1.5rem;

    }

</style> 