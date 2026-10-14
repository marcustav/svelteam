// Datas do contrato são texto "AAAA-MM-DD".
// Não usamos new Date(): ele lê a data como meia-noite UTC e, no fuso do Brasil,
// mostra o dia anterior (01/10 vira 30/09).
export function formatarData(texto: string): string {
	const [ano, mes, dia] = texto.split('-')
	return `${dia}/${mes}/${ano}`
}
