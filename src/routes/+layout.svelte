 <script lang="ts">

    import favicon from '../lib/assets/favicon.svg'

    import { page } from '$app/state'

    import type { LayoutProps } from './$types'

    import Filtros from '../lib/components/Filtros.svelte' // <-- NOVO IMPORT


    let { children }: LayoutProps = $props()


    let emTarefas = $derived(page.url.pathname === '/' || page.url.pathname.startsWith('/tarefas') || page.url.pathname.startsWith('/quadro'))

    let emProjetos = $derived(page.url.pathname.startsWith('/projetos'))

</script>


<!-- (Mantenha o svelte:head e o header exatamente como estão no seu arquivo original) -->

<svelte:head>

    <!-- ... -->

</svelte:head>


<header>

    <!-- ... -->

</header>


<main>

    {#if emTarefas}

        <Filtros />

    {/if}

    

    {@render children()}

</main>


<div class="bandeja" aria-hidden="true">

    <!-- ... -->

</div>


<style>

    /* (Mantenha todo o seu CSS original sem alterações) */

</style> 