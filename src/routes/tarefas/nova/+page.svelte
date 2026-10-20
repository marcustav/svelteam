<!-- src/routes/tarefas/nova/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import TarefaForm from '$lib/components/TarefaForm.svelte';
	import { criarTarefa } from '$lib/api';
	import type { NovaTarefa } from '../../../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Grava na API (POST) e volta para a lista de tarefas.
	// Se criarTarefa falhar, o erro sobe para o formulário, que avisa o usuário.
	async function salvar(dados: NovaTarefa) {
		await criarTarefa(dados);
		await goto('/');
	}
</script>

<svelte:head>
	<title>Nova tarefa</title>
</svelte:head>

<div class="pagina">
	<h1>Nova tarefa</h1>

	<TarefaForm
		projetos={data.projetos}
		inicial={data.projetoSelecionadoId ? { projetoId: data.projetoSelecionadoId } : {}}
		textoBotao="Criar tarefa"
		onsalvar={salvar}
	/>

	<p><a href="/">Cancelar e voltar para Tarefas</a></p>
</div>

<style>
	h1 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
	}
</style>