<script lang="ts">
	import favicon from '../lib/assets/favicon.svg'
	import { navigating, page } from '$app/state'
	import type { LayoutProps } from './$types'
	import Filtros from '../lib/components/Filtros.svelte'

	let { children }: LayoutProps = $props()

	let emTarefas = $derived(page.url.pathname === '/' || page.url.pathname.startsWith('/tarefas') || page.url.pathname.startsWith('/quadro'))
	let emProjetos = $derived(page.url.pathname.startsWith('/projetos'))
	let carregando = $derived(navigating.to !== null)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Work+Sans:wght@400;600&display=swap"
	/>
</svelte:head>

<a class="pular" href="#conteudo">Pular para o conteúdo</a>

<header>
	<div>
		<a class="marca" href="/">Svelteam</a>
		<p class="subtitulo">Gerenciador de tarefas acadêmicas</p>
	</div>

	<nav aria-label="Principal">
		<a href="/" aria-current={emTarefas ? 'page' : undefined}>Tarefas</a>
		<a href="/projetos" aria-current={emProjetos ? 'page' : undefined}>Projetos</a>
	</nav>
</header>

<!-- folha de exercícios presa na lousa, com moldura de madeira -->
<main id="conteudo" tabindex="-1">
	{#if carregando}
		<div class="carregando" role="status" aria-live="polite">
			<span class="indicador" aria-hidden="true"></span>
			Carregando dados…
		</div>
	{/if}

	{#if emTarefas}
		<Filtros />
	{/if}

	{@render children()}
</main>

<div class="bandeja" aria-hidden="true">
	<span class="giz giz-branco"></span>
	<span class="giz giz-amarelo"></span>
	<span class="apagador"></span>
</div>

<style>
	:global(:root) {
		--lousa: #2f4a3a;
		--giz: #f2f0e6;
		--giz-amarelo: #f4d35e;
		--madeira: #8b5e3c;
		--madeira-escura: #6a4429;
	}
	:global(body) {
		margin: 0;
		color: #2b2b2b;
		font-family: 'Work Sans', system-ui, sans-serif;
		/* lousa com manchas de giz apagado */
		background-color: var(--lousa);
		background-image:
			radial-gradient(ellipse 60% 30% at 20% 20%, rgba(255, 255, 255, 0.05), transparent),
			radial-gradient(ellipse 50% 25% at 80% 70%, rgba(255, 255, 255, 0.04), transparent),
			radial-gradient(ellipse 40% 20% at 60% 10%, rgba(255, 255, 255, 0.03), transparent);
		min-height: 100vh;
	}
	:global(h1, h2, h3) {
		font-family: 'Kalam', 'Comic Sans MS', cursive;
	}
	:global(:focus-visible) {
		outline: 3px solid var(--giz-amarelo);
		outline-offset: 3px;
	}

	/* texto so pra leitor de tela */
	:global(.so-leitor) {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
	.pular {
		position: absolute;
		left: -999px;
		top: 0.5rem;
		z-index: 10;
		padding: 0.6rem 1rem;
		background: var(--giz-amarelo);
		color: #1b1b1b;
		font-weight: 600;
	}
	.pular:focus {
		left: 0.5rem;
	}
	/* a folha e clara, o amarelo nao aparece nela: foco escuro */
	main :global(:focus-visible) {
		outline-color: #1a3d8f;
	}
	main:focus {
		outline: none;
	}

	header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 2rem 1.5rem;
	}
	.marca {
		font-family: 'Kalam', cursive;
		font-size: 2.6rem;
		font-weight: 700;
		color: var(--giz);
		text-decoration: none;
		/* efeito de giz: borda borrada */
		text-shadow:
			0 0 1px rgba(242, 240, 230, 0.8),
			1px 1px 2px rgba(242, 240, 230, 0.3);
	}
	.subtitulo {
		margin: 0;
		font-family: 'Kalam', cursive;
		font-size: 1.1rem;
		color: rgba(242, 240, 230, 0.75);
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}
	nav a {
		font-family: 'Kalam', cursive;
		font-size: 1.4rem;
		color: rgba(242, 240, 230, 0.7);
		text-decoration: none;
		padding-bottom: 0.15rem;
	}
	nav a:hover {
		color: var(--giz);
	}
	/* seção atual sublinhada com giz amarelo */
	nav a[aria-current='page'] {
		color: var(--giz-amarelo);
		border-bottom: 3px solid var(--giz-amarelo);
		border-radius: 2px 6px 3px 8px;
	}

	main {
		position: relative;
		max-width: 64rem;
		margin: 0 auto;
		padding: 2.5rem 2rem;
		background: #fbfaf4;
		border: 12px solid var(--madeira);
		border-image: linear-gradient(135deg, var(--madeira), var(--madeira-escura), var(--madeira)) 1;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
	}
	.carregando {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		margin-bottom: 1.5rem;
		padding: 0.85rem 1rem;
		border: 1px solid #d8c45a;
		border-radius: 6px;
		background: #fff8cf;
		color: #594b08;
		font-weight: 600;
	}
	.indicador {
		width: 1rem;
		height: 1rem;
		border: 3px solid rgba(89, 75, 8, 0.25);
		border-top-color: #594b08;
		border-radius: 50%;
		animation: girar 0.8s linear infinite;
	}
	@keyframes girar {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.indicador {
			animation: none;
		}
	}

	/* bandeja de giz embaixo da folha */
	.bandeja {
		display: flex;
		align-items: center;
		gap: 1rem;
		max-width: calc(64rem + 24px);
		height: 22px;
		margin: 0 auto 3rem;
		padding: 0 2rem;
		background: linear-gradient(var(--madeira), var(--madeira-escura));
		border-radius: 0 0 6px 6px;
		box-sizing: border-box;
	}
	.giz {
		width: 46px;
		height: 9px;
		border-radius: 4px;
	}
	.giz-branco {
		background: var(--giz);
	}
	.giz-amarelo {
		width: 30px;
		background: var(--giz-amarelo);
	}
	.apagador {
		margin-left: auto;
		width: 70px;
		height: 16px;
		background: linear-gradient(#c9a26a 40%, #444 40%);
		border-radius: 3px;
	}

	@media (max-width: 640px) {
		header {
			flex-direction: column;
			align-items: flex-start;
			padding: 1.5rem 1rem 1rem;
		}
		main {
			padding: 1.5rem 1rem;
			border-width: 8px;
		}
		/* alvo de toque maior no celular */
		main :global(button),
		main :global(select),
		main :global(input) {
			min-height: 2.75rem;
		}
		nav a {
			padding: 0.5rem 0;
		}
	}
</style>
