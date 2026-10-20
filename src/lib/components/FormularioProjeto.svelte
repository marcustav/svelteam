<script lang="ts">
	import { untrack, tick } from 'svelte'
	import type { NovoProjeto } from '../api'

	interface Props {
		// Dados para preencher o formulário (edição). Sem isso, abre vazio (cadastro).
		valorInicial?: NovoProjeto
		textoBotao: string
		// Quem usa o formulário decide o que fazer com os dados (criar ou atualizar na API)
		aoEnviar: (dados: NovoProjeto) => Promise<void>
	}

	type Campo = keyof NovoProjeto

	// Data de hoje como texto AAAA-MM-DD, sem passar por toISOString (que usa UTC e pode errar o dia)
	function hoje(): string {
		const d = new Date()
		const mes = String(d.getMonth() + 1).padStart(2, '0')
		const dia = String(d.getDate()).padStart(2, '0')
		return `${d.getFullYear()}-${mes}-${dia}`
	}

	let {
		valorInicial = { nome: '', descricao: '', disciplina: '', criadoEm: hoje() },
		textoBotao,
		aoEnviar
	}: Props = $props()

	// Copia os valores iniciais uma vez; depois o formulário é dono do que está digitando.
	let campos = $state<NovoProjeto>(untrack(() => ({ ...valorInicial })))
	let erros = $state<Partial<Record<Campo, string>>>({})
	let enviando = $state(false)
	let erroGeral = $state('')

	function validar(dados: NovoProjeto): Partial<Record<Campo, string>> {
		const e: Partial<Record<Campo, string>> = {}
		if (!dados.nome) e.nome = 'Informe o nome do projeto.'
		if (!dados.descricao) e.descricao = 'Informe a descrição do projeto.'
		if (!dados.disciplina) e.disciplina = 'Informe a disciplina.'
		if (!dados.criadoEm) e.criadoEm = 'Informe a data de criação.'
		return e
	}

	async function enviar(evento: SubmitEvent) {
		evento.preventDefault()
		erroGeral = ''

		const dados: NovoProjeto = {
			nome: campos.nome.trim(),
			descricao: campos.descricao.trim(),
			disciplina: campos.disciplina.trim(),
			criadoEm: campos.criadoEm
		}

		erros = validar(dados)
		if (Object.keys(erros).length > 0) {
			// Leva o foco para o primeiro campo com erro (ajuda quem usa só o teclado)
			await tick()
			document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
			return
		}

		enviando = true
		try {
			await aoEnviar(dados)
		} catch {
			erroGeral = 'Não foi possível salvar. Confira se a API (json-server) está rodando e tente de novo.'
		} finally {
			enviando = false
		}
	}
</script>

<form onsubmit={enviar} novalidate>
	<div class="campo">
		<label for="nome">Nome</label>
		<input
			id="nome"
			type="text"
			bind:value={campos.nome}
			aria-invalid={erros.nome ? 'true' : undefined}
			aria-describedby={erros.nome ? 'erro-nome' : undefined}
		/>
		{#if erros.nome}
			<p class="erro" id="erro-nome"><span aria-hidden="true">⚠</span> {erros.nome}</p>
		{/if}
	</div>

	<div class="campo">
		<label for="descricao">Descrição</label>
		<textarea
			id="descricao"
			rows="4"
			bind:value={campos.descricao}
			aria-invalid={erros.descricao ? 'true' : undefined}
			aria-describedby={erros.descricao ? 'erro-descricao' : undefined}
		></textarea>
		{#if erros.descricao}
			<p class="erro" id="erro-descricao"><span aria-hidden="true">⚠</span> {erros.descricao}</p>
		{/if}
	</div>

	<div class="campo">
		<label for="disciplina">Disciplina</label>
		<input
			id="disciplina"
			type="text"
			bind:value={campos.disciplina}
			aria-invalid={erros.disciplina ? 'true' : undefined}
			aria-describedby={erros.disciplina ? 'erro-disciplina' : undefined}
		/>
		{#if erros.disciplina}
			<p class="erro" id="erro-disciplina"><span aria-hidden="true">⚠</span> {erros.disciplina}</p>
		{/if}
	</div>

	<div class="campo">
		<label for="criadoEm">Data de criação</label>
		<!-- type="date" já entrega o valor como texto AAAA-MM-DD, igual ao contrato -->
		<input
			id="criadoEm"
			type="date"
			bind:value={campos.criadoEm}
			aria-invalid={erros.criadoEm ? 'true' : undefined}
			aria-describedby={erros.criadoEm ? 'erro-criadoEm' : undefined}
		/>
		{#if erros.criadoEm}
			<p class="erro" id="erro-criadoEm"><span aria-hidden="true">⚠</span> {erros.criadoEm}</p>
		{/if}
	</div>

	{#if erroGeral}
		<p class="erro erro-geral" role="alert"><span aria-hidden="true">⚠</span> {erroGeral}</p>
	{/if}

	<button type="submit" disabled={enviando}>
		{enviando ? 'Salvando...' : textoBotao}
	</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 36rem;
	}

	.campo {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	label {
		font-weight: bold;
		color: #34495e;
	}

	input,
	textarea {
		padding: 0.6rem 0.75rem;
		border: 1px solid #bdc3c7;
		border-radius: 4px;
		font: inherit;
	}

	input:focus-visible,
	textarea:focus-visible,
	button:focus-visible {
		outline: 3px solid #7dc4ee;
		outline-offset: 2px;
	}

	input[aria-invalid='true'],
	textarea[aria-invalid='true'] {
		border-color: #c0392b;
		border-width: 2px;
	}

	.erro {
		margin: 0;
		color: #a93226;
		font-size: 0.9rem;
		font-weight: bold;
	}

	.erro-geral {
		padding: 0.75rem 1rem;
		background: #fdecea;
		border: 1px solid #c0392b;
		border-radius: 4px;
	}

	button {
		align-self: flex-start;
		background-color: #0284c7;
		color: white;
		border: none;
		padding: 0.7rem 1.5rem;
		border-radius: 4px;
		font: inherit;
		font-weight: bold;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background-color: #0369a1;
	}

	button:disabled {
		background-color: #95a5a6;
		cursor: not-allowed;
	}
</style>
