import { json } from '@sveltejs/kit'
import { dogFacts } from '$lib/data/dog-facts'

export async function GET() {
	const randomFact = dogFacts[Math.floor(Math.random() * dogFacts.length)]
	return json({ fact: randomFact })
}
