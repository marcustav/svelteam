<!-- svelteam/marco-2/src/routes/projetos/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import { formatarData } from '../../lib/formatar';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Lista de Projetos</title>
</svelte:head>

<!-- div em vez de main: o <main> já vem do +layout.svelte -->
<div class="pagina">
	<h1>Meus Projetos</h1>

	<div class="grid-projetos">
		<!-- Iterando sobre os projetos usando o id como chave -->
		{#each data.projetos as projeto (projeto.id)}
			<article class="cartao-projeto">
				<div class="cabecalho">
					<h2>{projeto.nome}</h2>
					<span class="disciplina">{projeto.disciplina}</span>
				</div>

				<p class="descricao">{projeto.descricao}</p>

				<div class="rodape">
					<!-- formatarData evita o erro de fuso do new Date (01/10 virava 30/09) -->
					<small>Criado em: {formatarData(projeto.criadoEm)}</small>
					<a href="/projetos/{projeto.id}" class="btn-acessar">Acessar Projeto</a>
				</div>
			</article>
		{:else}
			<p>Nenhum projeto encontrado.</p>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 2rem;
	}

	.grid-projetos {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.cartao-projeto {
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.cabecalho {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.cabecalho h2 {
		margin: 0;
		font-size: 1.3rem;
		color: #2c3e50;
	}

	.disciplina {
		background-color: #e0f2fe;
		color: #0369a1;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.descricao {
		color: #555;
		margin: 0;
		flex-grow: 1;
	}

	.rodape {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
		border-top: 1px solid #eee;
		padding-top: 1rem;
	}

	.btn-acessar {
		background-color: #27ae60;
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.9rem;
		font-weight: bold;
	}

	.btn-acessar:hover {
		background-color: #219150;
	}
</style>
