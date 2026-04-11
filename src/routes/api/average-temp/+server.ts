import { json } from '@sveltejs/kit'
import type { RequestEvent } from './$types'

export async function GET({ url }: RequestEvent) {
	const temperatures = url.searchParams.getAll('temperatures').map(Number)
	const averageTemp = (temperatures.reduce((sum, current) => sum + current, 0) / temperatures.length).toFixed(1)
	return new Response(JSON.stringify({ averageTemp }))
}
