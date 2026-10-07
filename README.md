# Svelteam

Desenvolvimento Frontend · 2026.2 · Profª Marianne Lacerda Dutra Theodoro

Framework: Svelte 5 (SvelteKit) com TypeScript

## Integrantes

- Arthur Gabriel Monteiro Barreiras
- Durval Victor Castro Alves
- Marcus Tavares Pires
- Matheus Almeida Cirqueira
- Peutry de Lima Silva

## Como rodar

Requisito: Node.js 24 ou superior. Cada marco fica numa pasta própria.

```bash
cd marco-1
npm install
npm run dev
```

Em outro terminal, dentro da mesma pasta:

```bash
npx json-server db.json
```

## Restaurar os dados originais

O json-server grava no `db.json`. Para voltar ao estado inicial, dentro da pasta do marco:

```bash
cp db.seed.json db.json
```

## Estrutura

```
svelteam/
├── README.md
└── marco-1/
    ├── db.json           dados da API (json-server)
    ├── db.seed.json      cópia intacta do db.json
    ├──
