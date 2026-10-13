<script lang="ts">
	import TarefaCard from '../../../lib/TarefaCard.svelte'
	import { formatarData } from '../../../lib/rotulos'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
	let projeto = $derived(data.projeto)
</script>

<svelte:head><title>{projeto.nome} · Svelteam</title></svelte:head>

<main>
	<a href="/projetos">← Voltar para os projetos</a>
	<h1>{projeto.nome}</h1>
	<p>{projeto.descricao}</p>
	<p class="meta">{projeto.disciplina} · criado em {formatarData(projeto.criadoEm)}</p>
	<h2>Tarefas ({projeto.tarefas.length})</h2>
	{#if projeto.tarefas.length === 0}
		<p>Este projeto ainda não tem tarefas.</p>
	{:else}
		<ul class="grade">
			{#each projeto.tarefas as tarefa (tarefa.id)}
				<li><TarefaCard {tarefa} /></li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	main { max-width: 64rem; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
	.meta { color: #5b5864; }
	.grade { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr)); gap: 1rem; }
</style>
