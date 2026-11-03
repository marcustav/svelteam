<script lang="ts">
	import { page } from '$app/state';

	let naoEncontrado = $derived(page.status === 404);
	let tentandoNovamente = $state(false);

	function tentarNovamente() {
		tentandoNovamente = true;
		window.location.reload();
	}
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
		<h2>Não foi possível carregar os dados.</h2>
		<p role="alert">
			A API não respondeu. Confira se ela está rodando com
			<code>npx.cmd json-server db.json</code> e tente novamente.
		</p>
	{/if}

	<div class="acoes">
		{#if !naoEncontrado}
			<button type="button" class="btn-tentar" onclick={tentarNovamente} disabled={tentandoNovamente}>
				{tentandoNovamente ? 'Tentando novamente…' : 'Tentar novamente'}
			</button>
		{/if}
		<a href="/" class="btn-voltar">Voltar para o início</a>
	</div>
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

	.acoes {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
	}

	.btn-voltar,
	.btn-tentar {
		border: 0;
		background-color: #3498db;
		color: white;
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		font: inherit;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn-voltar:hover,
	.btn-tentar:hover:not(:disabled) {
		background-color: #2980b9;
	}

	.btn-tentar:disabled {
		opacity: 0.65;
		cursor: wait;
	}
</style>
