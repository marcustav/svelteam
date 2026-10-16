# Svelteam

Desenvolvimento Frontend · 2026.2 · Profª Marianne Lacerda Dutra Theodoro

Framework: Svelte 5 (SvelteKit) com TypeScript

## Integrantes

- Arthur Gabriel Monteiro Barreiras
- Marcus Tavares Pires
- Matheus Almeida Cirqueira
- Peutry de Lima Silva

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