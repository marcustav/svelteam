<!--
	src/lib/components/EstadoVazio.svelte
	Mensagem para quando não há nada para mostrar. Usado em três situações:
	- não existe nenhuma tarefa cadastrada (lista e quadro);
	- o projeto ainda não tem tarefas;
	- a busca e os filtros não encontraram nada.
	A ação (link ou botão) vem como conteúdo filho, porque cada situação pede uma diferente:
	<EstadoVazio titulo="..." mensagem="..."><a href="/tarefas/nova">+ Nova tarefa</a></EstadoVazio>
-->
<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		titulo: string
		mensagem?: string
		// ação opcional: o que a pessoa pode fazer para sair do estado vazio
		children?: Snippet
	}

	let { titulo, mensagem, children }: Props = $props()
</script>

<!-- role="status": leitores de tela anunciam a mensagem quando ela aparece (ex.: ao filtrar) -->
<div class="estado-vazio" role="status">
	<span class="icone" aria-hidden="true">📭</span>
	<p class="titulo">{titulo}</p>
	{#if mensagem}
		<p class="mensagem">{mensagem}</p>
	{/if}
	{#if children}
		<div class="acao">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.estado-vazio {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 2.5rem 1.5rem;
		text-align: center;
		background: #f3f1e8;
		border: 2px dashed #c9c3ad;
		border-radius: 8px;
	}

	.icone {
		font-size: 2.5rem;
		line-height: 1;
	}

	.titulo {
		margin: 0;
		font-family: 'Kalam', 'Comic Sans MS', cursive;
		font-size: 1.4rem;
		font-weight: 700;
		color: #2c3e50;
	}

	.mensagem {
		margin: 0;
		max-width: 32rem;
		color: #4b5563;
	}

	.acao {
		margin-top: 0.75rem;
	}

	/* o link/botão vem de quem usa o componente, por isso o :global (o estilo é só dentro do .acao) */
	.acao :global(a),
	.acao :global(button) {
		display: inline-block;
		background-color: var(--madeira);
		color: #fff;
		border: none;
		padding: 0.55rem 1.2rem;
		border-radius: 4px;
		font: inherit;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.acao :global(a:hover),
	.acao :global(button:hover) {
		background-color: var(--madeira-escura);
	}
</style>
