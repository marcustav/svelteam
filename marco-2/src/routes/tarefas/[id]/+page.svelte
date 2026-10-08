<script lang="ts">
	import type { PageProps } from './$types'
	import type { Status, Prioridade } from '../../../tipos'

	// data vem do retorno da função load em +page.ts
	let { data }: PageProps = $props()
	let tarefa = $derived(data.tarefa)

	// O contrato guarda os valores sem acento; aqui só traduzimos para exibir.
	const nomeStatus: Record<Status, string> = {
		'a-fazer': 'A fazer',
		'em-andamento': 'Em andamento',
		'em-revisao': 'Em revisão',
		concluida: 'Concluída'
	}

	const nomePrioridade: Record<Prioridade, string> = {
		baixa: 'Baixa',
		media: 'Média',
		alta: 'Alta'
	}

	// prazo é texto AAAA-MM-DD; mostramos como DD/MM/AAAA sem passar por Date
	function formatarData(texto: string): string {
		const [ano, mes, dia] = texto.split('-')
		return `${dia}/${mes}/${ano}`
	}
</script>

<svelte:head>
	<title>{tarefa.titulo}</title>
</svelte:head>

<article>
	<a href="/">← Voltar para a lista</a>

	<h1>{tarefa.titulo}</h1>
	<p>{tarefa.descricao}</p>

	<dl>
		<dt>Status</dt>
		<dd>{nomeStatus[tarefa.status]}</dd>

		<dt>Prioridade</dt>
		<dd>{nomePrioridade[tarefa.prioridade]}</dd>

		<dt>Responsável</dt>
		<dd>{tarefa.responsavel}</dd>

		<dt>Prazo</dt>
		<dd>{formatarData(tarefa.prazo)}</dd>

		<dt>Projeto</dt>
		<dd><a href="/projetos/{tarefa.projetoId}">Projeto {tarefa.projetoId}</a></dd>

		<dt>Id</dt>
		<dd>{tarefa.id}</dd>
	</dl>
</article>

<style>
	article {
		max-width: 40rem;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
	}
	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 0.5rem 1.5rem;
	}
	dt {
		font-weight: 600;
	}
	dd {
		margin: 0;
	}
</style>
