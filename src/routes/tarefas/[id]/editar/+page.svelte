<!-- src/routes/tarefas/[id]/editar/+page.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageProps } from './$types';

    // Recebe a tarefa atual e os projetos
    let { data }: PageProps = $props();

    // Inicializa o formulário com os dados atuais da tarefa
    let titulo = $state(data.tarefa.titulo);
    let descricao = $state(data.tarefa.descricao);
    let projetoId = $state(data.tarefa.projetoId);
    let status = $state(data.tarefa.status);
    let prioridade = $state(data.tarefa.prioridade);
    let responsavel = $state(data.tarefa.responsavel);
    let prazo = $state(data.tarefa.prazo);

    async function salvarEdicao() {
        if (!titulo || !projetoId) {
            alert('Preencha os campos obrigatórios!');
            return;
        }

        const tarefaAtualizada = {
            id: data.tarefa.id, // O ID deve ser mantido
            titulo,
            descricao,
            projetoId,
            status,
            prioridade,
            responsavel,
            prazo
        };

        try {
            // O método PUT substitui o registro existente na API
            const res = await fetch(`http://localhost:3000/tarefas/${data.tarefa.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarefaAtualizada)
            });

            if (res.ok) {
                // Após editar com sucesso, redireciona de volta para os detalhes da tarefa
                goto(`/tarefas/${data.tarefa.id}`);
            } else {
                alert('Erro ao salvar as alterações no json-server.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Não foi possível conectar à API.');
        }
    }
</script>

<div class="container">
    <h1>Editar Tarefa</h1>

    <form on:submit|preventDefault={salvarEdicao} class="form-tarefa">
        
        <div class="form-group">
            <label for="titulo">Título da Tarefa *</label>
            <input type="text" id="titulo" bind:value={titulo} required />
        </div>

        <div class="form-group">
            <label for="projeto">Projeto *</label>
            <select id="projeto" bind:value={projetoId} required>
                {#each data.projetos as projeto}
                    <option value={projeto.id}>{projeto.nome}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea id="descricao" bind:value={descricao} rows="4"></textarea>
        </div>

        <div class="form-group">
            <label for="status">Status</label>
            <select id="status" bind:value={status}>
                <option value="a-fazer">A fazer</option>
                <option value="em-andamento">Em andamento</option>
                <option value="em-revisao">Em revisão</option>
                <option value="concluida">Concluída</option>
            </select>
        </div>

        <div class="form-group">
            <label for="prioridade">Prioridade</label>
            <select id="prioridade" bind:value={prioridade}>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
        </div>

        <div class="form-group">
            <label for="responsavel">Responsável</label>
            <input type="text" id="responsavel" bind:value={responsavel} />
        </div>

        <div class="form-group">
            <label for="prazo">Prazo</label>
            <input type="date" id="prazo" bind:value={prazo} />
        </div>

        <div class="acoes">
            <!-- Botão cancelar volta para os detalhes da tarefa -->
            <button type="button" class="btn-cancelar" on:click={() => goto(`/tarefas/${data.tarefa.id}`)}>Cancelar</button>
            <button type="submit" class="btn-salvar">Salvar Alterações</button>
        </div>

    </form>
</div>

<style>
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .form-group { margin-bottom: 1rem; display: flex; flex-direction: column; }
    label { font-weight: bold; margin-bottom: 0.5rem; }
    input, select, textarea { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
    .acoes { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-salvar { background: #28a745; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-cancelar { background: #ccc; color: #333; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
</style>