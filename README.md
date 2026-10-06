# Svelteam

Desenvolvimento Frontend · 2026.2 · Profª Marianne Lacerda Dutra Theodoro

Framework: Svelte 5 (SvelteKit) com TypeScript

## Integrantes

- Arthur Gabriel Monteiro Barreiras
- Marcus Tavares Pires
- Matheus Almeida Cirqueira
- Peutry de Lima Silva

## Como rodar

Requisito: Node.js 24 ou superior (`node -v`).

```bash
npm install
npm run dev
```

A aplicação abre em http://localhost:5173.

Em outro terminal, suba a API local:
DD
```bash
npx json-server db.json
```

A API fica em http://localhost:3000 (`/projetos` e `/tarefas`).

## Restaurar os dados originais

O json-server grava no `db.json`. Para voltar ao estado inicial:

```bash
cp db.seed.json db.json
```

## Estrutura

```
├── db.json           dados da API (json-server)
├── db.seed.json      cópia intacta do db.json
├── src/
│   ├── tipos.ts      contrato de dados (Status, Prioridade, Projeto, Tarefa)
│   └── routes/
│       └── +page.svelte
└── package.json
```