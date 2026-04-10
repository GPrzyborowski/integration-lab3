import axios from "axios"

export async function load() {
	const imgRes = await axios.get('https://dog.ceo/api/breeds/image/random')
	const textRes = await axios.get('http://localhost:5173/api/dog/fact')
	const img = imgRes.data
	const text = textRes.data
	return {
        imageUrl: img.message as string,
        fact: text.fact as string
    }
}
