<script lang="ts">
    import { goto } from '$app/navigation';
    import { nanoid } from 'nanoid';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    // Estados reativos do formulário
    let titulo = $state('');
    let descricao = $state('');
    let projetoId = $state(data.projetoSelecionadoId || '');
    
    // Novos campos reativos inicializados com valores padrão
    let status = $state('a-fazer');
    let prioridade = $state('baixa');
    let responsavel = $state('');
    let prazo = $state(new Date().toISOString().split('T')[0]); // Data de hoje

    async function salvarTarefa() {
        if (!titulo || !projetoId) {
            alert('Preencha os campos obrigatórios!');
            return;
        }

        const novaTarefa = {
            id: nanoid(),
            titulo,
            descricao,
            projetoId,
            status,
            prioridade,
            // Se o campo ficar vazio, salva como "Não atribuído"
            responsavel: responsavel.trim() !== '' ? responsavel : 'Não atribuído',
            prazo
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
                // Redireciona para a página inicial
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

        <!-- Novos Campos Adicionados -->
        <div class="form-row">
            <div class="form-group w-50">
                <label for="status">Status</label>
                <select id="status" bind:value={status}>
                    <option value="a-fazer">A fazer</option>
                    <option value="em-andamento">Em andamento</option>
                    <option value="em-revisao">Em revisão</option>
                    <option value="concluida">Concluída</option>
                </select>
            </div>

            <div class="form-group w-50">
                <label for="prioridade">Prioridade</label>
                <select id="prioridade" bind:value={prioridade}>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group w-50">
                <label for="responsavel">Responsável</label>
                <input 
                    type="text" 
                    id="responsavel" 
                    bind:value={responsavel} 
                    placeholder="Ex: Maria" 
                />
            </div>

            <div class="form-group w-50">
                <label for="prazo">Prazo</label>
                <input 
                    type="date" 
                    id="prazo" 
                    bind:value={prazo} 
                />
            </div>
        </div>

        <div class="acoes">
            <button type="button" class="btn-cancelar" on:click={() => goto('/')}>Cancelar</button>
            <button type="submit" class="btn-salvar">Salvar Tarefa</button>
        </div>

    </form>
</div>

<style>
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .form-tarefa { display: flex; flex-direction: column; gap: 0.5rem; }
    
    .form-group { display: flex; flex-direction: column; }
    .form-group.w-50 { flex: 1; }
    
    /* Agrupa campos lado a lado em telas maiores */
    .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
    
    label { font-weight: bold; margin-bottom: 0.5rem; color: #333; }
    input, select, textarea { 
        padding: 0.6rem; 
        border: 1px solid #ccc; 
        border-radius: 4px; 
        font-size: 1rem;
        font-family: inherit;
    }
    
    .acoes { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-salvar { background: #0284c7; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-salvar:hover { background: #0369a1; }
    .btn-cancelar { background: #e5e7eb; color: #374151; padding: 0.6rem 1.2rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-cancelar:hover { background: #d1d5db; }
</style>