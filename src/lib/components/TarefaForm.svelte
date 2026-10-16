<!--
	Formulário de tarefa (item 17). Serve para CRIAR e para EDITAR:
	- criar:  <TarefaForm {projetos} textoBotao="Criar tarefa" onsalvar={...} />
	- editar: <TarefaForm {projetos} inicial={tarefa} textoBotao="Salvar alterações" onsalvar={...} />
	Quem usa o formulário decide o que fazer com os dados (criarTarefa ou atualizarTarefa).
-->
<script lang="ts">
	import { untrack } from 'svelte';
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

	async function enviar(evento: SubmitEvent) {
		evento.preventDefault(); // não recarrega a página
		// $state.snapshot: entrega um objeto comum (sem a reatividade do Svelte) para a API
		await onsalvar($state.snapshot(dados));
	}
</script>

<form class="formulario" onsubmit={enviar}>
	<div class="campo">
		<label for="titulo">Título</label>
		<input id="titulo" type="text" bind:value={dados.titulo} />
	</div>

	<div class="campo">
		<label for="descricao">Descrição</label>
		<textarea id="descricao" rows="3" bind:value={dados.descricao}></textarea>
	</div>

	<div class="campo">
		<label for="projeto">Projeto</label>
		<!-- opções carregadas da API -->
		<select id="projeto" bind:value={dados.projetoId}>
			<option value="" disabled>Escolha um projeto</option>
			{#each projetos as projeto (projeto.id)}
				<option value={projeto.id}>{projeto.nome}</option>
			{/each}
		</select>
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
			<label for="responsavel">Responsável</label>
			<input id="responsavel" type="text" bind:value={dados.responsavel} />
		</div>

		<div class="campo">
			<label for="prazo">Prazo</label>
			<!-- input date já trabalha com texto AAAA-MM-DD, o mesmo formato do contrato -->
			<input id="prazo" type="date" bind:value={dados.prazo} />
		</div>
	</div>

	<!-- Item 20 (validação) entra aqui: mensagens de erro junto a cada campo e botão bloqueado durante o envio -->
	<button type="submit">{textoBotao}</button>
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
	button:hover {
		background: #24392d;
	}
	@media (max-width: 560px) {
		.linha {
			grid-template-columns: 1fr;
		}
	}
</style>
