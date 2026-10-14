<!-- svelteam/marco-2/src/routes/+error.svelte -->
<script lang="ts">
    // Agora importamos do $app/state
    import { page } from '$app/state';
</script>

<svelte:head>
    <!-- Tiramos o $ da frente do page -->
    <title>Erro {page.status} - Página não encontrada</title>
</svelte:head>

<main class="container-erro">
    <!-- Tiramos o $ da frente do page aqui também -->
    <h1>{page.status}</h1>
    <h2>Oops! Página não encontrada.</h2>
    <p>A rota que você tentou acessar (<strong>{page.url.pathname}</strong>) não existe ou foi movida.</p>
    
    <a href="/" class="btn-voltar">Voltar para o início</a>
</main>

<style>
    .container-erro {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        text-align: center;
        font-family: sans-serif;
        color: #333;
    }

    h1 {
        font-size: 6rem;
        margin: 0;
        color: #e74c3c;
    }

    h2 {
        font-size: 2rem;
        margin-top: 0;
        color: #2c3e50;
    }

    p {
        color: #666;
        margin-bottom: 2rem;
    }

    .btn-voltar {
        background-color: #3498db;
        color: white;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.2s;
    }

    .btn-voltar:hover {
        background-color: #2980b9;
    }
</style>