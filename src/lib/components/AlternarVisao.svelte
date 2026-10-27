<!-- src/lib/components/AlternarVisao.svelte -->
<script lang="ts">
	import { page } from '$app/state'

	// As duas visões das mesmas tarefas. Links comuns: o SvelteKit troca de tela sem recarregar,
	// e o estado de busca e filtros (lib/filtros.svelte.ts) fica fora das rotas, então continua igual.
	const visoes = [
		{ href: '/', texto: 'Lista' },
		{ href: '/quadro', texto: 'Quadro' }
	]
</script>

<nav class="alternar" aria-label="Alternar visão das tarefas">
	{#each visoes as visao (visao.href)}
		<a href={visao.href} aria-current={page.url.pathname === visao.href ? 'page' : undefined}>
			{visao.texto}
		</a>
	{/each}
</nav>

<style>
	.alternar {
		display: inline-flex;
		margin-bottom: 1.5rem;
		border: 2px solid #2f4a3a;
		border-radius: 999px;
		overflow: hidden;
	}

	a {
		padding: 0.4rem 1.4rem;
		color: #2f4a3a;
		font-weight: 600;
		text-decoration: none;
	}

	a:hover {
		background-color: #e3e9e4;
	}

	/* visão atual: preenchida e com texto, não só cor */
	a[aria-current='page'] {
		background-color: #2f4a3a;
		color: #f2f0e6;
	}
</style>