<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { untrack } from 'svelte';
	import type { PageData } from './$types';
	import type { Status } from '../tipos';
	import { atualizarTarefa } from '../lib/api';
	import TarefaCard from '../lib/components/TarefaCard.svelte';
	import AlternarVisao from '../lib/components/AlternarVisao.svelte';
	import EstadoVazio from '../lib/components/EstadoVazio.svelte';
	import { filtros, limparFiltros } from '../lib/filtros.svelte';
	import { descreverFiltros, filtrarTarefas } from '../derivar';

	let { data }: { data: PageData } = $props();

	// copia local das tarefas, pra trocar so a que mudou sem recarregar tudo
	let tarefas = $state(untrack(() => data.tarefas));

	async function mudarStatus(id: string, status: Status) {
		const nova = await atualizarTarefa(id, { status });
		tarefas = tarefas.map((t) => (t.id === id ? nova : t));
	}

	// Aplica o filtro global reativamente na lista principal
	let tarefasFiltradas = $derived(filtrarTarefas(tarefas, filtros));

	// Texto do que está filtrado, usado na mensagem de "nada encontrado"
	let filtrosAtivos = $derived(descreverFiltros(filtros));
</script>

<svelte:head>
	<title>Lista de Tarefas</title>
</svelte:head>

<div class="pagina">
	<h1>Minhas Tarefas</h1>

	<!-- Alterna entre as duas visões das tarefas: Lista e Quadro -->
	<div class="visao">
		<AlternarVisao />
	</div>

	<!-- Estado vazio: dois casos diferentes, cada um com a sua saída -->
	{#if tarefas.length === 0}
		<EstadoVazio
			titulo="Nenhuma tarefa cadastrada ainda."
			mensagem="Crie a primeira tarefa para começar a organizar o trabalho da equipe."
		>
			<a href="/tarefas/nova">+ Nova tarefa</a>
		</EstadoVazio>
	{:else if tarefasFiltradas.length === 0}
		<EstadoVazio
			titulo="Nenhuma tarefa encontrada."
			mensagem="Nenhuma tarefa corresponde a: {filtrosAtivos.join(' · ')}. Tente outros termos ou limpe os filtros."
		>
			<button type="button" onclick={limparFiltros}>Limpar filtros</button>
		</EstadoVazio>
	{:else}
		<h2 class="so-leitor">Tarefas</h2>
		<div class="grid-tarefas">
			{#each tarefasFiltradas as tarefa (tarefa.id)}
				<TarefaCard {tarefa} aoMudarStatus={mudarStatus} />
			{/each}
		</div>
	{/if}
</div>

<style>
	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 2rem;
	}

	.visao {
		display: flex;
		justify-content: center;
	}

	.grid-tarefas {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}
</style>
