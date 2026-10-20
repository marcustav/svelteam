<!-- src/routes/projetos/novo/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import FormularioProjeto from '../../../lib/components/FormularioProjeto.svelte'
	import { criarProjeto } from '../../../lib/api'
	import type { NovoProjeto } from '../../../lib/api'

	// Grava na API (POST) e, se deu certo, volta para a lista de projetos.
	// Se criarProjeto falhar, o erro sobe para o formulário, que avisa o usuário.
	async function salvar(dados: NovoProjeto) {
		await criarProjeto(dados)
		await goto('/projetos')
	}
</script>

<svelte:head>
	<title>Novo projeto</title>
</svelte:head>

<div class="pagina">
	<h1>Novo projeto</h1>

	<FormularioProjeto textoBotao="Cadastrar projeto" aoEnviar={salvar} />

	<p><a href="/projetos">Cancelar e voltar para Projetos</a></p>
</div>

<style>
	h1 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
	}
</style>
