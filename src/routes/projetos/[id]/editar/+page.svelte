<!-- src/routes/projetos/[id]/editar/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import FormularioProjeto from '$lib/components/FormularioProjeto.svelte'
	import { atualizarProjeto } from '$lib/api'
	import type { NovoProjeto } from '$lib/api'

	let { data }: { data: PageData } = $props()
	let projeto = $derived(data.projeto)

	// Envia só os campos do formulário (PATCH); o id não muda. Depois volta para a página do projeto.
	async function salvar(dados: NovoProjeto) {
		await atualizarProjeto(projeto.id, dados)
		await goto(`/projetos/${projeto.id}`)
	}
</script>

<svelte:head>
	<title>Editar {projeto.nome}</title>
</svelte:head>

<div class="pagina">
	<h1>Editar projeto</h1>

	<!-- {#key}: se a URL mudar de um projeto para outro, o formulário recomeça com os dados do novo -->
	{#key projeto.id}
		<FormularioProjeto
			valorInicial={{
				nome: projeto.nome,
				descricao: projeto.descricao,
				disciplina: projeto.disciplina,
				criadoEm: projeto.criadoEm
			}}
			textoBotao="Salvar alterações"
			aoEnviar={salvar}
		/>
	{/key}

	<p><a href="/projetos/{projeto.id}">Cancelar e voltar para o projeto</a></p>
</div>

<style>
	h1 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
	}
</style>
