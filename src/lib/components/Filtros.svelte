 <script lang="ts">

    import { filtros, limparFiltros } from '../filtros.svelte';

</script>


<div class="filtros-container">

    <input 

        type="text" 

        placeholder="Buscar tarefas..." 

        bind:value={filtros.busca} 

        aria-label="Buscar tarefas"

    />

    

    <select bind:value={filtros.status} aria-label="Filtrar por status">

        <option value="">Todos os status</option>

        <option value="pendente">Pendente</option>

        <option value="em-andamento">Em Andamento</option>

        <option value="em-revisao">Em Revisão</option>

        <option value="concluida">Concluída</option>

    </select>

    

    <button onclick={limparFiltros} type="button">

        Limpar

    </button>

</div>


<style>

    .filtros-container {

        display: flex;

        gap: 1rem;

        margin-bottom: 2rem;

        background: #f3f1e8;

        padding: 1rem;

        border-radius: 8px;

        border: 1px solid #dcd8c8;

    }


    input, select {

        padding: 0.5rem;

        border: 1px solid #ccc;

        border-radius: 4px;

        font-family: 'Work Sans', sans-serif;

        font-size: 1rem;

        flex: 1;

    }


    button {

        background: var(--madeira);

        color: #fff;

        border: none;

        padding: 0.5rem 1rem;

        border-radius: 4px;

        cursor: pointer;

        font-family: 'Work Sans', sans-serif;

        font-weight: 600;

        transition: background 0.2s;

    }


    button:hover {

        background: var(--madeira-escura);

    }


    @media (max-width: 640px) {

        .filtros-container {

            flex-direction: column;

        }

    }

</style> 