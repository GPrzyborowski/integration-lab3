import axios from 'axios'

export async function load() {
	try {
		const imgRes = await axios.get('https://dog.ceo/api/breeds/image/random')
		if (imgRes.status !== 200) {
			throw new Error(`Failed to fetch image: ${imgRes.status}`)
		}
		const textRes = await axios.get('http://localhost:5173/api/dog/fact')
		if (textRes.status !== 200) {
			throw new Error(`Failed to fetch a fact: ${textRes.status}`)
		}
		const img = imgRes.data
		const text = await textRes.data
		return {
			imageUrl: img.message as string,
			fact: text.fact as string,
		}
	} catch (err) {
		console.error(err)
		return { imageUrl: '', fact: 'Loading a fact failed.' }
	}
}
