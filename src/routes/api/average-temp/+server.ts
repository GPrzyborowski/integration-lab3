import { calculateAvg } from '$lib/tempUtils'
import type { RequestEvent } from './$types'

export async function GET({ url }: RequestEvent) {
	const temperatures = url.searchParams.getAll('temperatures').map(Number)
	if (temperatures.length === 0) {
		return new Response(JSON.stringify({ error: 'No temperatures provided' }), { status: 400 })
	}
	const averageTemp = calculateAvg({ temperatures })
	return new Response(JSON.stringify({ averageTemp }), { status: 200 })
}
