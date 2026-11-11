import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		allowedHosts: true
	},
	plugins: [
		sveltekit({
			// SvelteKit 3 removeu o alias $lib por padrão (ele usa #lib agora), mas o projeto
			// inteiro já importa via $lib; mantemos o alias em vez de migrar todos os imports.
			alias: { $lib: 'src/lib' },

			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Marco 6 (item 41): adapter-static gera o site de produção só com arquivos
			// (HTML, CSS e JS) na pasta build/. O fallback é a página "casca" que o servidor
			// entrega para qualquer rota; o roteador do SvelteKit, no navegador, abre a tela certa.
			adapter: adapter({ fallback: '200.html' })
		})
	]
});
