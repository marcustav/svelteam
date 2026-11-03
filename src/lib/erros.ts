// src/lib/erros.ts
// Erro padronizado das chamadas à API e as mensagens que a tela mostra para cada caso.
// Função pura: nenhuma linha importa Svelte, então serve para formulários, cartão e exclusão.

// rede  = nem chegou na API (json-server desligado, sem internet)
// tempo = a API não respondeu dentro do limite
// http  = a API respondeu, mas com erro (404, 500...)
export type TipoErro = 'rede' | 'tempo' | 'http'

export class ErroApi extends Error {
	tipo: TipoErro
	status?: number

	constructor(tipo: TipoErro, mensagem: string, status?: number) {
		super(mensagem)
		this.name = 'ErroApi'
		this.tipo = tipo
		this.status = status
	}
}

export type Acao = 'salvar' | 'excluir' | 'mudar o status'

// Texto para o usuário: diz o que deu errado e o que fazer.
export function mensagemDeErro(erro: unknown, acao: Acao): string {
	const inicio = `Não foi possível ${acao}.`

	if (erro instanceof ErroApi) {
		if (erro.tipo === 'rede') {
			return `${inicio} A API não respondeu: confira se o json-server está rodando (npx json-server db.json) e tente de novo.`
		}
		if (erro.tipo === 'tempo') {
			return `${inicio} A API demorou demais para responder. Tente de novo em instantes.`
		}
		if (erro.status === 404) {
			return `${inicio} O registro não existe mais (pode ter sido excluído em outra aba).`
		}
		return `${inicio} A API recusou o pedido (erro ${erro.status}). Tente de novo.`
	}

	return `${inicio} Tente de novo.`
}
