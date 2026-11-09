// src/env.ts
// Marco 6: aqui declaramos as variáveis de ambiente que o app usa (novidade do SvelteKit 3).
// O SvelteKit lê o .env.development (npm run dev) ou o .env.production (npm run build)
// e confere cada valor com o schema antes de usar.
import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_API_URL: {
		description: 'Endereço da API (json-server): local no desenvolvimento, hospedada em produção',
		// public: o navegador pode ler (é só um endereço, não é senha) -> import de $app/env/public
		public: true,
		// static: o valor é escrito dentro do JavaScript na hora do npm run build
		static: true,
		schema: (valor) => {
			if (!valor) throw new Error('Defina PUBLIC_API_URL no .env.development ou .env.production')
			if (!/^https?:\/\//.test(valor)) throw new Error('PUBLIC_API_URL precisa começar com http:// ou https://')
			return valor.replace(/\/$/, '') // tira a barra do fim, se tiver
		}
	}
})
