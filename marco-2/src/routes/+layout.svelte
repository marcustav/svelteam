<script lang="ts">
	import favicon from '../lib/assets/favicon.svg'
	import { page } from '$app/state'
	import type { LayoutProps } from './$types'

	let { children }: LayoutProps = $props()

	// Marca a aba da seção atual
	let emTarefas = $derived(page.url.pathname === '/' || page.url.pathname.startsWith('/tarefas'))
	let emProjetos = $derived(page.url.pathname.startsWith('/projetos'))
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Recursive:wght,CASL@300..900,0..1&display=swap"
	/>
</svelte:head>

<header>
	<a class="marca" href="/">Svelteam</a>
	<p class="subtitulo">Gerenciador de tarefas acadêmicas</p>

	<!-- Abas de fichário: a aba atual se encaixa na folha de baixo -->
	<nav aria-label="Principal">
		<a class="aba aba-tarefas" href="/" aria-current={emTarefas ? 'page' : undefined}>Tarefas</a>
		<a class="aba aba-projetos" href="/projetos" aria-current={emProjetos ? 'page' : undefined}
			>Projetos</a
		>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	/* ---------- Tokens do tema "caderno" ---------- */
	:global(:root) {
		--papel: #f7f9fb;
		--quadricula: #dfe8f1;
		--folha: #ffffff;
		--pauta: #e4edf7;
		--margem: #e2574c;
		--grafite: #23272f;
		--grafite-suave: #5a6170;
		--tinta: #2340a0;

		/* marca-texto */
		--mt-amarelo: #ffe766;
		--mt-laranja: #ffc98b;
		--mt-rosa: #ffb7d5;
		--mt-verde: #a6edb1;

		--fonte: 'Recursive', system-ui, sans-serif;
	}

	:global(body) {
		margin: 0;
		color: var(--grafite);
		font-family: var(--fonte);
		font-variation-settings: 'CASL' 0;
		line-height: 1.5;
		/* papel quadriculado */
		background-color: var(--papel);
		background-image:
			linear-gradient(var(--quadricula) 1px, transparent 1px),
			linear-gradient(90deg, var(--quadricula) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	/* títulos com o eixo "casual" da Recursive: parece escrito à mão, mas legível */
	:global(h1, h2, h3) {
		font-variation-settings: 'CASL' 1;
		line-height: 1.15;
	}
	:global(h1) {
		font-size: 2.25rem;
		font-weight: 800;
		margin: 0 0 1.5rem;
	}

	:global(a) {
		color: var(--tinta);
	}
	:global(:focus-visible) {
		outline: 3px solid var(--tinta);
		outline-offset: 3px;
		border-radius: 4px;
	}

	/* ---------- Cabeçalho ---------- */
	header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: 0 2rem;
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 2rem 0;
	}
	.marca {
		grid-column: 1;
		font-size: 2rem;
		font-weight: 900;
		font-variation-settings: 'CASL' 1;
		color: var(--tinta);
		text-decoration: none;
	}
	.subtitulo {
		grid-column: 1;
		margin: 0 0 1rem;
		color: var(--grafite-suave);
	}
	nav {
		grid-column: 2;
		grid-row: 1 / span 2;
		align-self: end;
		display: flex;
		gap: 0.25rem;
	}

	/* abas coloridas como as divisórias de um fichário */
	.aba {
		position: relative;
		padding: 0.6rem 1.4rem 0.7rem;
		border: 2px solid var(--grafite);
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		color: var(--grafite);
		font-weight: 600;
		text-decoration: none;
	}
	.aba-tarefas {
		background: var(--mt-amarelo);
	}
	.aba-projetos {
		background: var(--mt-verde);
	}
	/* aba de trás: mais baixa, apoiada na borda da folha */
	.aba:not([aria-current='page']) {
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
	}
	.aba:not([aria-current='page']):hover {
		padding-top: 0.55rem;
	}
	/* aba da frente: branca e emendada na folha, cobrindo a borda */
	.aba[aria-current='page'] {
		top: 2px;
		background: var(--folha);
		z-index: 1;
	}

	/* ---------- Folha principal ---------- */
	main {
		max-width: 64rem;
		margin: 0 auto 3rem;
		padding: 2.5rem 2rem;
		background: var(--folha);
		border: 2px solid var(--grafite);
		border-radius: 0 0 12px 12px;
		box-shadow: 6px 6px 0 var(--quadricula);
	}

	@media (max-width: 640px) {
		header {
			grid-template-columns: 1fr;
			padding: 1.25rem 1rem 0;
		}
		nav {
			grid-column: 1;
			grid-row: auto;
		}
		main {
			padding: 1.5rem 1rem;
			border-radius: 0;
		}
	}
</style>
