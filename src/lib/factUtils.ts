import { dogFacts } from '$lib/data/dog-facts'

export function randomFact() {
    const fact = dogFacts[Math.floor(Math.random() * dogFacts.length)]
    return fact
}