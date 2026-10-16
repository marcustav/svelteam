<!-- svelteam/marco-2/src/routes/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import TarefaCard from '../lib/components/TarefaCard.svelte';

	// Sintaxe moderna do Svelte 5
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Lista de Tarefas</title>
</svelte:head>

<!-- div em vez de main: o <main> já vem do +layout.svelte -->
<div class="pagina">
	<h1>Minhas Tarefas</h1>

	<div class="grid-tarefas">
		<!-- O (tarefa.id) garante que o ID seja a chave, como pedido na issue -->
		{#each data.tarefas as tarefa (tarefa.id)}
			<!-- Um cartão por tarefa, usando o componente do item 8 -->
			<TarefaCard {tarefa} />
		{:else}
			<p>Nenhuma tarefa encontrada.</p>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 2rem;
	}

	.grid-tarefas {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}
</style>
