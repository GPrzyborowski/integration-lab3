export async function load() {
	const imgRes = await fetch('https://dog.ceo/api/breeds/image/random')
	const textRes = await fetch('http://localhost:5173/api/dog/fact')
	const img = await imgRes.json()
	const text = await textRes.json()
	return {
        imageUrl: img.message as string,
        fact: text.fact as string
    }
}
