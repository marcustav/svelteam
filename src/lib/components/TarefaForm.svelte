<!--
	Formulário de tarefa (item 17). Serve para CRIAR e para EDITAR:
	- criar:  <TarefaForm {projetos} textoBotao="Criar tarefa" onsalvar={...} />
	- editar: <TarefaForm {projetos} inicial={tarefa} textoBotao="Salvar alterações" onsalvar={...} />
	Quem usa o formulário decide o que fazer com os dados (criarTarefa ou atualizarTarefa).
-->
<script lang="ts">
	import { untrack, tick } from 'svelte';
	import type { NovaTarefa, Projeto, Status, Prioridade } from '../../tipos';

	interface Props {
		// projetos para o seletor, carregados da API pela página (listarProjetos)
		projetos: Projeto[];
		// dados para preencher o formulário: a tarefa ao editar, ou só { projetoId } ao criar a partir de um projeto
		inicial?: Partial<NovaTarefa>;
		textoBotao?: string;
		// chamado ao enviar, com os dados já no formato do contrato
		onsalvar: (dados: NovaTarefa) => void | Promise<void>;
	}

	type Campo = keyof NovaTarefa;

	let { projetos, inicial = {}, textoBotao = 'Salvar', onsalvar }: Props = $props();

	// valores possíveis vêm do contrato; o texto é só para exibir
	const opcoesStatus: { valor: Status; texto: string }[] = [
		{ valor: 'a-fazer', texto: 'A fazer' },
		{ valor: 'em-andamento', texto: 'Em andamento' },
		{ valor: 'em-revisao', texto: 'Em revisão' },
		{ valor: 'concluida', texto: 'Concluída' }
	];
	const opcoesPrioridade: { valor: Prioridade; texto: string }[] = [
		{ valor: 'baixa', texto: 'Baixa' },
		{ valor: 'media', texto: 'Média' },
		{ valor: 'alta', texto: 'Alta' }
	];

	// Estado do formulário: começa com valores padrão e, por cima, o que veio em `inicial`.
	// untrack: lemos `inicial` só uma vez, ao abrir; depois quem manda é o que a pessoa digita.
	let dados = $state<NovaTarefa>(
		untrack(() => ({
			titulo: '',
			descricao: '',
			projetoId: '',
			status: 'a-fazer',
			prioridade: 'media',
			responsavel: '',
			prazo: '',
			...inicial
		}))
	);

	// Item 20: status e prioridade sempre têm um valor válido pré-selecionado, por isso só os
	// campos que podem ficar vazios entram na validação.
	let erros = $state<Partial<Record<Campo, string>>>({});
	let enviando = $state(false);
	let erroGeral = $state('');

	function validar(valores: NovaTarefa): Partial<Record<Campo, string>> {
		const e: Partial<Record<Campo, string>> = {};
		if (!valores.titulo) e.titulo = 'Informe o título da tarefa.';
		if (!valores.descricao) e.descricao = 'Informe a descrição da tarefa.';
		if (!valores.projetoId) e.projetoId = 'Escolha um projeto.';
		if (!valores.responsavel) e.responsavel = 'Informe o responsável.';
		if (!valores.prazo) e.prazo = 'Informe o prazo.';
		return e;
	}

	async function enviar(evento: SubmitEvent) {
		evento.preventDefault(); // não recarrega a página
		erroGeral = '';

		// $state.snapshot: entrega um objeto comum (sem a reatividade do Svelte) para a API
		const valores: NovaTarefa = {
			...$state.snapshot(dados),
			titulo: dados.titulo.trim(),
			descricao: dados.descricao.trim(),
			responsavel: dados.responsavel.trim()
		};

		erros = validar(valores);
		if (Object.keys(erros).length > 0) {
			// Leva o foco para o primeiro campo com erro (ajuda quem usa só o teclado)
			await tick();
			document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
			return;
		}

		enviando = true;
		try {
			await onsalvar(valores);
		} catch {
			erroGeral = 'Não foi possível salvar. Confira se a API (json-server) está rodando e tente de novo.';
		} finally {
			enviando = false;
		}
	}
</script>

<form class="formulario" onsubmit={enviar} novalidate aria-busy={enviando}>
	<p class="dica">Todos os campos são obrigatórios.</p>

	<div class="campo">
		<label for="titulo">Título <span class="obrigatorio" aria-hidden="true">(obrigatório)</span></label>
		<input
			id="titulo"
			aria-required="true"
			type="text"
			bind:value={dados.titulo}
			aria-invalid={erros.titulo ? 'true' : undefined}
			aria-describedby={erros.titulo ? 'erro-titulo' : undefined}
		/>
		{#if erros.titulo}
			<p class="erro" id="erro-titulo"><span aria-hidden="true">⚠</span> {erros.titulo}</p>
		{/if}
	</div>

	<div class="campo">
		<label for="descricao">Descrição <span class="obrigatorio" aria-hidden="true">(obrigatório)</span></label>
		<textarea
			id="descricao"
			aria-required="true"
			rows="3"
			bind:value={dados.descricao}
			aria-invalid={erros.descricao ? 'true' : undefined}
			aria-describedby={erros.descricao ? 'erro-descricao' : undefined}
		></textarea>
		{#if erros.descricao}
			<p class="erro" id="erro-descricao"><span aria-hidden="true">⚠</span> {erros.descricao}</p>
		{/if}
	</div>

	<div class="campo">
		<label for="projeto">Projeto <span class="obrigatorio" aria-hidden="true">(obrigatório)</span></label>
		<!-- opções carregadas da API -->
		<select
			id="projeto"
			aria-required="true"
			bind:value={dados.projetoId}
			aria-invalid={erros.projetoId ? 'true' : undefined}
			aria-describedby={erros.projetoId ? 'erro-projeto' : undefined}
		>
			<option value="" disabled>Escolha um projeto</option>
			{#each projetos as projeto (projeto.id)}
				<option value={projeto.id}>{projeto.nome}</option>
			{/each}
		</select>
		{#if erros.projetoId}
			<p class="erro" id="erro-projeto"><span aria-hidden="true">⚠</span> {erros.projetoId}</p>
		{/if}
	</div>

	<div class="linha">
		<div class="campo">
			<label for="status">Status</label>
			<select id="status" bind:value={dados.status}>
				{#each opcoesStatus as opcao (opcao.valor)}
					<option value={opcao.valor}>{opcao.texto}</option>
				{/each}
			</select>
		</div>

		<div class="campo">
			<label for="prioridade">Prioridade</label>
			<select id="prioridade" bind:value={dados.prioridade}>
				{#each opcoesPrioridade as opcao (opcao.valor)}
					<option value={opcao.valor}>{opcao.texto}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="linha">
		<div class="campo">
			<label for="responsavel">Responsável <span class="obrigatorio" aria-hidden="true">(obrigatório)</span></label>
			<input
				id="responsavel"
				aria-required="true"
				type="text"
				bind:value={dados.responsavel}
				aria-invalid={erros.responsavel ? 'true' : undefined}
				aria-describedby={erros.responsavel ? 'erro-responsavel' : undefined}
			/>
			{#if erros.responsavel}
				<p class="erro" id="erro-responsavel"><span aria-hidden="true">⚠</span> {erros.responsavel}</p>
			{/if}
		</div>

		<div class="campo">
			<label for="prazo">Prazo <span class="obrigatorio" aria-hidden="true">(obrigatório)</span></label>
			<!-- input date já trabalha com texto AAAA-MM-DD, o mesmo formato do contrato -->
			<input
				id="prazo"
				aria-required="true"
				type="date"
				bind:value={dados.prazo}
				aria-invalid={erros.prazo ? 'true' : undefined}
				aria-describedby={erros.prazo ? 'erro-prazo' : undefined}
			/>
			{#if erros.prazo}
				<p class="erro" id="erro-prazo"><span aria-hidden="true">⚠</span> {erros.prazo}</p>
			{/if}
		</div>
	</div>

	{#if erroGeral}
		<p class="erro erro-geral" role="alert"><span aria-hidden="true">⚠</span> {erroGeral}</p>
	{/if}

	<button type="submit" disabled={enviando}>{enviando ? 'Salvando...' : textoBotao}</button>
</form>

<style>
	.formulario {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		max-width: 36rem;
	}
	.linha {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.campo {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	label {
		font-weight: 600;
		font-size: 0.95rem;
	}
	input,
	textarea,
	select {
		font: inherit;
		padding: 0.55rem 0.7rem;
		border: 1px solid #b8bec9;
		border-radius: 6px;
		background: #fff;
		color: inherit;
	}
	input:focus,
	textarea:focus,
	select:focus {
		outline: 3px solid #f4d35e;
		outline-offset: 1px;
		border-color: #2f4a3a;
	}
	input[aria-invalid='true'],
	textarea[aria-invalid='true'],
	select[aria-invalid='true'] {
		border-color: #c0392b;
		border-width: 2px;
	}
	.obrigatorio,
	.dica {
		font-weight: 400;
		font-size: 0.85rem;
		color: #4a5260;
	}
	.dica {
		margin: 0;
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
		border-radius: 6px;
	}
	button {
		align-self: flex-start;
		padding: 0.7rem 1.4rem;
		border: none;
		border-radius: 6px;
		background: #2f4a3a;
		color: #f2f0e6;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	button:focus-visible {
		outline: 3px solid #f4d35e;
		outline-offset: 2px;
	}
	button:hover:not(:disabled) {
		background: #24392d;
	}
	button:disabled {
		background: #8a9087;
		cursor: not-allowed;
	}
	@media (max-width: 560px) {
		.linha {
			grid-template-columns: 1fr;
		}
	}
</style>
