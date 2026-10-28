<script lang="ts">
	import type { Tarefa, Status, Prioridade } from '../../tipos';

	interface Props {
		tarefa: Tarefa;
		// quem e dono da lista grava na API; sem isso o cartao so mostra o status
		aoMudarStatus?: (id: string, status: Status) => Promise<void>;
	}

	let { tarefa, aoMudarStatus }: Props = $props();

	let salvando = $state(false);
	let erro = $state('');

	const rotulosStatus: Record<Status, string> = {
		'a-fazer': 'A fazer',
		'em-andamento': 'Em andamento',
		'em-revisao': 'Em revisão',
		concluida: 'Concluída'
	};

	const rotulosPrioridade: Record<Prioridade, string> = {
		baixa: 'Baixa',
		media: 'Média',
		alta: 'Alta'
	};

	async function trocarStatus(evento: Event & { currentTarget: HTMLSelectElement }) {
		const campo = evento.currentTarget;
		const novo = campo.value as Status;
		erro = '';
		salvando = true;
		try {
			await aoMudarStatus?.(tarefa.id, novo);
		} catch {
			// volta o select pro status antigo, senao ele fica mostrando um valor que nao foi salvo
			campo.value = tarefa.status;
			erro = 'Não foi possível salvar o status.';
		} finally {
			salvando = false;
		}
	}

	// prazo vem como texto "AAAA-MM-DD"; formatamos sem criar Date para evitar erro de fuso horário
	function formatarPrazo(prazo: string): string {
		const [ano, mes, dia] = prazo.split('-');
		return `${dia}/${mes}/${ano}`;
	}
</script>

<article class="cartao prioridade-{tarefa.prioridade}">
	<h3 class="titulo"><a href="/tarefas/{tarefa.id}">{tarefa.titulo}</a></h3>

	<div class="etiquetas">
		<span class="status status-{tarefa.status}">{rotulosStatus[tarefa.status]}</span>
		<span class="prioridade">Prioridade {rotulosPrioridade[tarefa.prioridade].toLowerCase()}</span>
	</div>

	<dl class="detalhes">
		<div>
			<dt>Responsável</dt>
			<dd>{tarefa.responsavel}</dd>
		</div>
		<div>
			<dt>Prazo</dt>
			<dd><time datetime={tarefa.prazo}>{formatarPrazo(tarefa.prazo)}</time></dd>
		</div>
	</dl>

	{#if aoMudarStatus}
		<div class="mudar-status">
			<label for="status-{tarefa.id}">Mudar status</label>
			<select
				id="status-{tarefa.id}"
				value={tarefa.status}
				onchange={trocarStatus}
				disabled={salvando}
			>
				{#each Object.entries(rotulosStatus) as [valor, texto] (valor)}
					<option value={valor}>{texto}</option>
				{/each}
			</select>
			{#if erro}
				<p class="erro" role="alert"><span aria-hidden="true">⚠</span> {erro}</p>
			{/if}
		</div>
	{/if}
</article>

<style>
	.cartao {
		background: #fff;
		border: 1px solid #d9dee7;
		border-left-width: 5px;
		border-radius: 8px;
		padding: 1rem 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prioridade-alta {
		border-left-color: #c0392b;
	}
	.prioridade-media {
		border-left-color: #d68910;
	}
	.prioridade-baixa {
		border-left-color: #2e86c1;
	}

	.titulo {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.3;
	}
	.titulo a {
		color: inherit;
		text-decoration: none;
	}
	.titulo a:hover {
		text-decoration: underline;
	}

	.etiquetas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
	}

	.status {
		padding: 0.15rem 0.6rem;
		border-radius: 999px;
		font-weight: 600;
		background: #e8ecf2;
		color: #34495e;
	}
	.status-em-andamento {
		background: #fdebd0;
		color: #7e5109;
	}
	.status-em-revisao {
		background: #e8daef;
		color: #512e5f;
	}
	.status-concluida {
		background: #d5f5e3;
		color: #196f3d;
	}

	.prioridade {
		color: #566573;
	}

	.detalhes {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.75rem;
		margin: 0;
		font-size: 0.9rem;
	}
	.detalhes dt {
		color: #566573;
		font-size: 0.8rem;
	}
	.detalhes dd {
		margin: 0;
		font-weight: 600;
	}

	.mudar-status {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		font-size: 0.85rem;
	}
	.mudar-status label {
		color: #566573;
	}
	.mudar-status select {
		font: inherit;
		padding: 0.35rem 0.5rem;
		border: 1px solid #b8bec9;
		border-radius: 6px;
		background: #fff;
	}
	.mudar-status select:focus-visible {
		outline: 3px solid #f4d35e;
		outline-offset: 1px;
	}
	.erro {
		margin: 0;
		color: #a93226;
		font-weight: bold;
	}
</style>
