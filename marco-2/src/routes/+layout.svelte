<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const links = [
		{ href: '/', texto: 'Tarefas' },
		{ href: '/projetos', texto: 'Projetos' }
	];

	// "/" só fica ativo na rota exata; os demais também nas rotas filhas (ex.: /projetos/1)
	function ativo(href: string): boolean {
		const caminho = page.url.pathname;
		if (href === '/') return caminho === '/' || caminho.startsWith('/tarefas');
		return caminho === href || caminho.startsWith(href + '/');
	}
</script>

<div class="app">
	<header class="cabecalho">
		<a class="marca" href="/">Svelteam</a>
		<nav aria-label="Navegação principal">
			<ul>
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							class:ativo={ativo(link.href)}
							aria-current={ativo(link.href) ? 'page' : undefined}
						>
							{link.texto}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>

	<main class="conteudo">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
		background: #f4f6fa;
		color: #1c2733;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.cabecalho {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 2rem;
		padding: 0.9rem 1.5rem;
		background: #1c2733;
		color: #fff;
	}

	.marca {
		font-size: 1.25rem;
		font-weight: 700;
		color: #ff7a3d;
		text-decoration: none;
	}

	ul {
		display: flex;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		display: block;
		padding: 0.4rem 0.9rem;
		border-radius: 6px;
		color: #d6dde6;
		text-decoration: none;
	}
	nav a:hover {
		background: #2c3b4b;
		color: #fff;
	}
	nav a.ativo {
		background: #ff7a3d;
		color: #1c2733;
		font-weight: 600;
	}

	a:focus-visible {
		outline: 3px solid #ffd2b8;
		outline-offset: 2px;
	}

	.conteudo {
		flex: 1;
		width: 100%;
		max-width: 960px;
		margin: 0 auto;
		padding: 1.5rem;
		box-sizing: border-box;
	}
</style>
