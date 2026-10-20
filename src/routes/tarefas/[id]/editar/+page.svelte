<!-- src/routes/tarefas/[id]/editar/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import TarefaForm from '$lib/components/TarefaForm.svelte';
	import { atualizarTarefa } from '$lib/api';
	import type { NovaTarefa } from '../../../../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let tarefa = $derived(data.tarefa);

	// Envia só os campos do formulário (PATCH); o id não muda. Depois volta para a tarefa.
	async function salvar(dados: NovaTarefa) {
		await atualizarTarefa(tarefa.id, dados);
		await goto(`/tarefas/${tarefa.id}`);
	}
</script>

<svelte:head>
	<title>Editar {tarefa.titulo}</title>
</svelte:head>

<div class="pagina">
	<h1>Editar tarefa</h1>

	<!-- {#key}: se a URL mudar de uma tarefa para outra, o formulário recomeça com os dados da nova -->
	{#key tarefa.id}
		<TarefaForm
			projetos={data.projetos}
			inicial={{
				titulo: tarefa.titulo,
				descricao: tarefa.descricao,
				projetoId: tarefa.projetoId,
				status: tarefa.status,
				prioridade: tarefa.prioridade,
				responsavel: tarefa.responsavel,
				prazo: tarefa.prazo
			}}
			textoBotao="Salvar alterações"
			onsalvar={salvar}
		/>
	{/key}

	<p><a href="/tarefas/{tarefa.id}">Cancelar e voltar para a tarefa</a></p>
</div>

<style>
	h1 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
	}
</style>