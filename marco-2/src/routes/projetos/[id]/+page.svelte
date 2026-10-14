<!-- svelteam/marco-2/src/routes/projetos/[id]/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    // Facilitando o acesso à variável
    let projeto = data.projeto;
</script>

<svelte:head>
    <title>{projeto.nome} - Detalhes</title>
</svelte:head>

<main class="detalhes-projeto">
    <header>
        <h1>{projeto.nome}</h1>
        <span class="disciplina">{projeto.disciplina}</span>
    </header>

    <section class="conteudo">
        <h2>Descrição do Projeto</h2>
        <p>{projeto.descricao}</p>
        
        <p class="data-criacao">
            <strong>Data de criação:</strong> 
            {new Date(projeto.criadoEm).toLocaleDateString('pt-BR')}
        </p>
    </section>

    <footer>
        <a href="/projetos" class="btn-voltar">Voltar para Projetos</a>
    </footer>
</main>

<style>
    .detalhes-projeto {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        font-family: sans-serif;
    }

    header {
        border-bottom: 2px solid #eaeaea;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-size: 2.5rem;
    }

    .disciplina {
        background-color: #e0f2fe;
        color: #0369a1;
        padding: 0.35rem 0.75rem;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;
    }

    .conteudo h2 {
        color: #34495e;
        margin-bottom: 1rem;
    }

    .conteudo p {
        line-height: 1.6;
        color: #555;
        font-size: 1.1rem;
    }

    .data-criacao {
        margin-top: 2rem;
        color: #7f8c8d;
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
    }

    footer {
        margin-top: 3rem;
    }

    .btn-voltar {
        background-color: #95a5a6;
        color: white;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.2s;
    }

    .btn-voltar:hover {
        background-color: #7f8c8d;
    }
</style>