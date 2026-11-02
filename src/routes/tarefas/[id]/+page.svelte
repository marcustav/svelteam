<script lang="ts">
    import type { PageProps } from './$types'
    import type { Status, Prioridade } from '../../../tipos'
    import { goto } from '$app/navigation'
    import { excluirTarefa } from '../../../lib/api'

    // data vem do retorno da função load em +page.ts
    let { data }: PageProps = $props()
    let tarefa = $derived(data.tarefa)

    // Marco 5: excluir com confirmação
    // A confirmação é um <dialog>: o navegador já prende o foco nele e fecha com Esc.
    let dialogo: HTMLDialogElement | undefined = $state()
    let excluindo = $state(false)
    let erro = $state('')

    function pedirConfirmacao() {
        erro = ''
        dialogo?.showModal()
    }

    async function confirmarExclusao() {
        excluindo = true
        try {
            await excluirTarefa(tarefa.id)
            // volta para a lista; invalidateAll faz o load buscar as tarefas de novo, já sem a apagada
            await goto('/', { invalidateAll: true })
        } catch {
            erro = 'Não foi possível excluir a tarefa. Tente de novo.'
            excluindo = false
            dialogo?.close()
        }
    }

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
    <header class="cabecalho-acoes">
        <a href="/">← Voltar para a lista</a>
        <div class="botoes">
            <a href="/tarefas/{tarefa.id}/editar" class="btn-acao">
                ✏️ Editar Tarefa
            </a>
            <button type="button" class="btn-excluir" onclick={pedirConfirmacao}>
                🗑️ Excluir Tarefa
            </button>
        </div>
    </header>

    {#if erro}
        <p class="erro" role="alert">{erro}</p>
    {/if}

    <dialog bind:this={dialogo} aria-labelledby="titulo-excluir">
        <h2 id="titulo-excluir">Excluir tarefa?</h2>
        <p>A tarefa “{tarefa.titulo}” será apagada. Isso não pode ser desfeito.</p>
        <div class="botoes">
            <button type="button" class="btn-cancelar" onclick={() => dialogo?.close()} disabled={excluindo}>
                Cancelar
            </button>
            <button type="button" class="btn-excluir" onclick={confirmarExclusao} disabled={excluindo}>
                {excluindo ? 'Excluindo...' : 'Excluir'}
            </button>
        </div>
    </dialog>

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
    
    .cabecalho-acoes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .btn-acao {
        background-color: #007bff;
        color: white;
        padding: 0.5rem 1rem;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        font-size: 0.9rem;
        transition: background-color 0.2s;
    }

    .btn-acao:hover {
        background-color: #0056b3;
    }

    .botoes {
        display: flex;
        gap: 0.5rem;
    }

    .btn-excluir {
        background-color: #b02a37;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font: inherit;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
    }

    .btn-excluir:hover {
        background-color: #8a1f2a;
    }

    .btn-excluir:disabled {
        opacity: 0.6;
        cursor: wait;
    }

    dialog {
        border: none;
        border-radius: 8px;
        padding: 1.5rem;
        max-width: 24rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.45);
    }

    dialog h2 {
        margin-top: 0;
    }

    dialog .botoes {
        justify-content: flex-end;
    }

    .btn-cancelar {
        background: #e2e2e2;
        color: #222;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font: inherit;
        font-size: 0.9rem;
        cursor: pointer;
    }

    .erro {
        color: #b02a37;
        font-weight: 600;
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