<!-- src/routes/quadro/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import TarefaCard from '../../lib/components/TarefaCard.svelte';
	import { agruparPorStatus, filtrarTarefas, ROTULOS_STATUS } from '../../derivar';
	import { filtros } from '../../lib/filtros.svelte';

	let { data }: { data: PageData } = $props();

	// Filtra pelo estado compartilhado e agrupa nas 4 colunas fixas de status
	let colunas = $derived(agruparPorStatus(filtrarTarefas(data.tarefas, filtros)));
</script>

<svelte:head>
	<title>Quadro de Tarefas</title>
</svelte:head>

<div class="pagina">
	<h1>Quadro de Tarefas</h1>

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
					{#each coluna.tarefas as tarefa (tarefa.id)}
						<TarefaCard {tarefa} />
					{:else}
						<p class="vazia">Nenhuma tarefa.</p>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 2rem;
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
