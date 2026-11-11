# Svelteam

Desenvolvimento Frontend · 2026.2 · Profª Marianne Lacerda Dutra Theodoro

Framework: Svelte 5 (SvelteKit) com TypeScript

## Aplicação publicada

- Site: https://SEU-PROJETO.vercel.app
- API (json-server): https://api.nvop8mxu7gq1xvmfaxhehu.152.67.61.172.sslip.io

O site é estático (build do SvelteKit com `adapter-static`) e está hospedado na Vercel.
O `vercel.json` manda qualquer rota que não seja arquivo (por exemplo `/tarefas/2`) para o
`200.html`, e o roteador do SvelteKit abre a tela certa no navegador. Por isso recarregar uma
rota interna não dá 404.

## Integrantes

- Arthur Gabriel Monteiro Barreiras
- Marcus Tavares Pires
- Matheus Almeida Cirqueira
- Peutry de Lima Silva
- Durval Victor Castro Alves

## Como rodar

Requisito: Node.js 24 ou superior.

```bash
npm install
npm run dev
```

Em outro terminal, a API local:

```bash
npx json-server db.json
```

## Restaurar os dados originais

O json-server grava no `db.json`. Para voltar ao estado inicial:

```bash
cp db.seed.json db.json
```

## Entregas por marco

Cada entrega está marcada com uma tag no GitHub (aba Tags): `marco-2`, `marco-3`…

## Estrutura

```
svelteam/
├── db.json / db.seed.json   dados da API (json-server)
├── package.json
└── src/
    ├── tipos.ts             contrato de dados
    ├── lib/                 api.ts, componentes e utilitários
    └── routes/              uma pasta por rota
```
