<!-- src/routes/tarefas/nova/+page.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
    import { nanoid } from 'nanoid';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    let titulo = $state('');
    let descricao = $state('');
    let projetoId = $state(data.projetoSelecionadoId || '');

    async function salvarTarefa() {
        if (!titulo || !projetoId) {
            alert('Preencha os campos obrigatórios!');
            return;
        }

        // Pegando a data de hoje no formato YYYY-MM-DD
        const hoje = new Date().toISOString().split('T')[0];

        const novaTarefa = {
            id: nanoid(),
            titulo,
            descricao,
            projetoId,
            status: 'a-fazer',
            prioridade: 'baixa', // Valor padrão para evitar erro no toLowerCase()
            responsavel: 'Não atribuído', // Valor padrão
            prazo: hoje // Prazo padrão inicial
        };

        try {
            const res = await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaTarefa)
            });

            if (res.ok) {
                // Redireciona com segurança agora que a tarefa está completa
                goto('/');
            } else {
                alert('Erro ao salvar a tarefa no json-server.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Não foi possível conectar à API.');
        }
    }
</script>

<div class="container">
    <h1>Criar Nova Tarefa</h1>

    <form on:submit|preventDefault={salvarTarefa} class="form-tarefa">
        
        <div class="form-group">
            <label for="titulo">Título da Tarefa *</label>
            <input 
                type="text" 
                id="titulo" 
                bind:value={titulo} 
                placeholder="Ex: Refatorar componente de botão" 
                required 
            />
        </div>

        <div class="form-group">
            <label for="projeto">Projeto *</label>
            <select id="projeto" bind:value={projetoId} required>
                <option value="" disabled>Selecione um projeto...</option>
                {#each data.projetos as projeto}
                    <option value={projeto.id}>
                        {projeto.nome}
                    </option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea 
                id="descricao" 
                bind:value={descricao} 
                rows="4" 
                placeholder="Detalhes adicionais da tarefa..."
            ></textarea>
        </div>

        <div class="acoes">
            <button type="button" class="btn-cancelar" on:click={() => goto('/tarefas')}>Cancelar</button>
            <button type="submit" class="btn-salvar">Salvar Tarefa</button>
        </div>

    </form>
</div>

<style>
    /* Estilos básicos para o formulário não ficar quebrado */
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .form-group { margin-bottom: 1rem; display: flex; flex-direction: column; }
    label { font-weight: bold; margin-bottom: 0.5rem; }
    input, select, textarea { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
    .acoes { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-salvar { background: #007bff; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
    .btn-cancelar { background: #ccc; color: #333; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
</style>