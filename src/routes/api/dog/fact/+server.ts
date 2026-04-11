import { json } from '@sveltejs/kit'
import { dogFacts } from '$lib/data/dog-facts'

export async function GET() {
	const randomFact = dogFacts[Math.floor(Math.random() * dogFacts.length)]
	if (!randomFact) {
		return json({ error: 'No facts available' }, { status: 500 })
	}
	return json({ fact: randomFact }, { status: 200 })
}
