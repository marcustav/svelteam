<!-- src/routes/quadro/+page.svelte -->
<script lang="ts">
	import { untrack } from 'svelte';
	import type { PageData } from './$types';
	import type { Status } from '../../tipos';
	import { atualizarTarefa } from '../../lib/api';
	import TarefaCard from '../../lib/components/TarefaCard.svelte';
	import AlternarVisao from '../../lib/components/AlternarVisao.svelte';
	import EstadoVazio from '../../lib/components/EstadoVazio.svelte';
	import { agruparPorStatus, descreverFiltros, filtrarTarefas, ROTULOS_STATUS } from '../../derivar';
	import { filtros, limparFiltros } from '../../lib/filtros.svelte';

	let { data }: { data: PageData } = $props();

	// copia local: quando o status muda a gente troca a tarefa aqui e a coluna recalcula
	let tarefas = $state(untrack(() => data.tarefas));

	async function mudarStatus(id: string, status: Status) {
		const nova = await atualizarTarefa(id, { status });
		tarefas = tarefas.map((t) => (t.id === id ? nova : t));
	}

	// Filtra pelo estado compartilhado e agrupa nas 4 colunas fixas de status
	let tarefasFiltradas = $derived(filtrarTarefas(tarefas, filtros));
	let colunas = $derived(agruparPorStatus(tarefasFiltradas));

	// Texto do que está filtrado, usado na mensagem de "nada encontrado"
	let filtrosAtivos = $derived(descreverFiltros(filtros));
</script>

<svelte:head>
	<title>Quadro de Tarefas</title>
</svelte:head>

<div class="pagina">
	<h1>Quadro de Tarefas</h1>

	<!-- Alterna entre as duas visões das tarefas: Lista e Quadro -->
	<div class="visao">
		<AlternarVisao />
	</div>

	<!-- Estado vazio: em vez de quatro colunas vazias, uma mensagem só, com a saída certa -->
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
		<div class="quadro">
			{#each colunas as coluna (coluna.status)}
				<section class="coluna coluna-{coluna.status}" aria-labelledby="titulo-{coluna.status}">
					<header class="cabecalho-coluna">
						<h2 id="titulo-{coluna.status}">{ROTULOS_STATUS[coluna.status]}</h2>
						<span class="contador" aria-label="{coluna.tarefas.length} tarefas">
							{coluna.tarefas.length}
						</span>
					</header>

					<div class="cartoes">
						<!-- coluna vazia com outras colunas cheias: aviso curto, dentro da própria coluna -->
						{#each coluna.tarefas as tarefa (tarefa.id)}
							<TarefaCard {tarefa} aoMudarStatus={mudarStatus} />
						{:else}
							<p class="vazia">Nenhuma tarefa neste status.</p>
						{/each}
					</div>
				</section>
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

	.quadro {
		display: grid;
		grid-template-columns: repeat(4, minmax(220px, 1fr));
		gap: 1.25rem;
		align-items: start;
	}

	.coluna {
		background: #f3f1e8;
		border: 1px solid #dcd8c8;
		border-top: 4px solid #34495e;
		border-radius: 8px;
		padding: 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		min-height: 12rem;
	}

	.coluna-em-andamento {
		border-top-color: #d68910;
	}
	.coluna-em-revisao {
		border-top-color: #7d3c98;
	}
	.coluna-concluida {
		border-top-color: #196f3d;
	}

	.cabecalho-coluna {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #dcd8c8;
	}

	.cabecalho-coluna h2 {
		margin: 0;
		font-size: 1.15rem;
		color: #2c3e50;
	}

	.contador {
		background: #e2dfd3;
		color: #2c3e50;
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0.15rem 0.55rem;
		border-radius: 999px;
	}

	.cartoes {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.vazia {
		margin: 0.5rem 0;
		color: #6b7280;
		font-size: 0.9rem;
		text-align: center;
	}

	@media (max-width: 960px) {
		.quadro {
			grid-template-columns: repeat(2, minmax(220px, 1fr));
		}
	}

	@media (max-width: 560px) {
		.quadro {
			grid-template-columns: 1fr;
		}
	}
</style>