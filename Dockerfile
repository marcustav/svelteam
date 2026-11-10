FROM node:24-alpine

WORKDIR /app

# Usa as versões do projeto, incluindo json-server (uma devDependency).
# O prepare do Svelte não é necessário para executar somente a API.
COPY package.json package-lock.json ./
RUN npm ci --include=dev --ignore-scripts && npm cache clean --force

# A semente fica fora do volume para não sobrescrever dados em novos deploys.
COPY db.seed.json ./db.seed.json
# json-server verifica public ao iniciar em modo de produção, mesmo sem assets.
RUN mkdir -p /app/public /data && chown node:node /data

ENV NODE_ENV=production
ENV PORT=3000

USER node
VOLUME ["/data"]
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/tarefas', {signal: AbortSignal.timeout(4000)}).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Inicializa o banco apenas quando o volume ainda não contém db.json.
# exec permite que json-server receba os sinais de encerramento do container.
CMD ["sh", "-c", "set -eu; if [ ! -f /data/db.json ]; then cp /app/db.seed.json /data/db.json; fi; exec node /app/node_modules/json-server/lib/bin.js /data/db.json --host 0.0.0.0 --port \"$PORT\""]
