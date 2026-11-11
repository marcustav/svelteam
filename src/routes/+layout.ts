// src/routes/+layout.ts
// Marco 6 (item 41): o site de produção é só de arquivos estáticos, sem servidor Node do SvelteKit.
// ssr = false: as páginas não são montadas no servidor; o load roda no navegador e busca a API.
// prerender = false: nada é gerado no build, porque os dados mudam (vêm da API).
export const ssr = false
export const prerender = false
