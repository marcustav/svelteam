<!-- svelteam/marco-2/src/routes/+error.svelte -->
<script lang="ts">
	// Agora importamos do $app/state
	import { page } from '$app/state';

	// 404 = endereço, tarefa ou projeto que não existe; outros códigos = falha ao carregar
	let naoEncontrado = $derived(page.status === 404);
</script>

<svelte:head>
	<title>Erro {page.status} - {naoEncontrado ? 'Página não encontrada' : 'Erro ao carregar'}</title>
</svelte:head>

<!-- div em vez de main: o <main> já vem do +layout.svelte -->
<div class="container-erro">
	<h1>{page.status}</h1>

	{#if naoEncontrado}
		<h2>Oops! Página não encontrada.</h2>
		<p>
			{page.error?.message ?? 'Não encontrado'} (<strong>{page.url.pathname}</strong>).
		</p>
	{:else}
		<h2>Não foi possível carregar a página.</h2>
		<p>Confira se a API está rodando com <code>npx json-server db.json</code>.</p>
	{/if}

	<a href="/" class="btn-voltar">Voltar para o início</a>
</div>

<style>
	.container-erro {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		text-align: center;
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
