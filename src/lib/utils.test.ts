import { describe, it, expect } from 'vitest'
import { calculateAvg } from '$lib/tempUtils'
import { randomFact } from '$lib/factUtils'
import { dogFacts } from './data/dog-facts'

describe('temperature', () => {
	it('should calculate average temperature for given array', () => {
		const temperatures = [
			12.7, 11, 9.4, 8.2, 7.1, 6, 5.4, 4.8, 4.3, 4, 3.6, 3.5, 3.9, 5, 6.5, 8, 9.5, 10.5, 11.4, 12.1, 12.8, 12.8, 13,
			12.9,
		]
		const avg = calculateAvg({ temperatures })
		expect(avg).toBe(8.3)
	})
})

describe('facts', () => {
    it('should return a fact from dog-facts array', () => {
        const fact = randomFact()
        expect(dogFacts).toContain(fact)
    })
    it('should return a string', () => {
        const fact = randomFact()
        expect(typeof fact).toBe('string')
    })
})