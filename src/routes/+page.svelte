 <!-- svelteam/marco-2/src/routes/+page.svelte -->

<script lang="ts">

    import { untrack } from 'svelte';

    import type { PageData } from './$types';

    import type { Status } from '../tipos';

    import { atualizarTarefa } from '../lib/api';

    import TarefaCard from '../lib/components/TarefaCard.svelte';

    import { filtros } from '../lib/filtros.svelte';

    import { filtrarTarefas } from '../derivar';


    let { data }: { data: PageData } = $props();


    // copia local das tarefas, pra trocar so a que mudou sem recarregar tudo

    let tarefas = $state(untrack(() => data.tarefas));


    async function mudarStatus(id: string, status: Status) {

        const nova = await atualizarTarefa(id, { status });

        tarefas = tarefas.map((t) => (t.id === id ? nova : t));

    }


    // Aplica o filtro global reativamente na lista principal

    let tarefasFiltradas = $derived(filtrarTarefas(tarefas, filtros));

</script>


<svelte:head>

    <title>Lista de Tarefas</title>

</svelte:head>


<div class="pagina">

    <h1>Minhas Tarefas</h1>


    <div class="grid-tarefas">

        {#each tarefasFiltradas as tarefa (tarefa.id)}

            <TarefaCard {tarefa} aoMudarStatus={mudarStatus} />

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