<script lang="ts">
	import { formatarData } from '../../lib/rotulos'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<svelte:head><title>Projetos · Svelteam</title></svelte:head>

<main>
	<a href="/">← Voltar para as tarefas</a>
	<h1>Projetos</h1>
	<ul class="lista">
		{#each data.projetos as projeto (projeto.id)}
			<li>
				<a class="projeto" href="/projetos/{projeto.id}">
					<h2>{projeto.nome}</h2>
					<p>{projeto.descricao}</p>
					<p class="meta">{projeto.disciplina} · criado em {formatarData(projeto.criadoEm)}</p>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main { max-width: 64rem; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
	.lista { list-style: none; padding: 0; display: grid; gap: 1rem; }
	.projeto { display: block; padding: 1.25rem; background: #fff; border: 1px solid #e4e0da; border-radius: 12px; color: inherit; text-decoration: none; }
	.projeto:hover, .projeto:focus-visible { border-color: #ff6a3d; }
	h2 { margin: 0 0 0.5rem; font-size: 1.25rem; }
	p { margin: 0.25rem 0; }
	.meta { font-size: 0.9rem; color: #5b5864; }
</style>
