// src/lib/filtros.svelte.ts
// Estado compartilhado de busca e filtros: um lugar só, fora das rotas.
// A extensão .svelte.ts é obrigatória: só nela as runes ($state) funcionam fora de um componente.
import { FILTROS_INICIAIS, type Filtros } from '../derivar'

// Exportamos um OBJETO e mudamos as propriedades dele.
// `export let busca = $state('')` seguido de `busca = 'x'` não funciona: quem importa
// recebe uma cópia do valor, então o Svelte proíbe exportar estado que é reatribuído.
export const filtros = $state<Filtros>({ ...FILTROS_INICIAIS })

// Toda mudança passa por uma função com nome, e não cada componente mexendo do seu jeito.
export function alterarFiltros(parcial: Partial<Filtros>) {
	Object.assign(filtros, parcial)
}

export function limparFiltros() {
	Object.assign(filtros, FILTROS_INICIAIS)
}
