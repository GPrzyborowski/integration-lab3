import { json } from '@sveltejs/kit'
import { randomFact } from '$lib/factUtils'

export async function GET() {
	const fact = randomFact()
	if (!fact) {
		return json({ error: 'No facts available' }, { status: 500 })
	}
	return json({ fact: fact }, { status: 200 })
}
