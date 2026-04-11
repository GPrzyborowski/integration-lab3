import type { RequestEvent } from '../$types'
import axios from 'axios'
import { GEMINI_API_KEY } from '$env/static/private'
import { GoogleGenAI } from '@google/genai'
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

export const actions = {
	weather: async ({ request }: RequestEvent) => {
		try {
			const data = await request.formData()
			const city = data.get('city')
			const geo = await axios.get(
				`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
			)
			if (geo.status !== 200) {
				throw new Error(`Failed to fetch geocoding parameters: ${geo.status}`)
			}
			const geoResPrepared = geo.data.results[0]
			const forecast = await axios.get(
				`https://api.open-meteo.com/v1/forecast?latitude=${geoResPrepared.latitude}&longitude=${geoResPrepared.longitude}&	hourly=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=2`,
			)
			if (forecast.status !== 200) {
				throw new Error(`Failed to fetch forecast: ${forecast.status}`)
			}
			const forecastData = forecast.data
			const now = new Date()
			const currentHour = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:00`
			const startIndex = forecastData.hourly.time.findIndex((t: string) => t == currentHour)

			const slicedForecast = {
				...forecastData,
				hourly: {
					time: forecastData.hourly.time.slice(startIndex, startIndex + 24),
					temperature_2m: forecastData.hourly.temperature_2m.slice(startIndex, startIndex + 24),
				},
			}
			const response = await ai.models.generateContent({
				model: 'gemini-2.5-flash',
				contents: `${JSON.stringify(slicedForecast.hourly)} based on this hourly weather forecast data generate a 3-4 sentence summary of today's temperature (in celsius scale) and some recommendations for someone planning to go outside. Return only the answer without any intro.`,
			})
			const query = slicedForecast.hourly.temperature_2m.map((temp: number) => `temperatures=${temp}`).join('&')
			const averageTemperatureRes = await axios.get(`http://localhost:5173/api/average-temp?${query}`)
			if (averageTemperatureRes.status !== 200) {
				throw new Error(`Failed to fetch average temperature: ${averageTemperatureRes.status}`)
			}
			const averageTemperature = averageTemperatureRes.data.averageTemp
			return { forecast: slicedForecast, response: response.text, averageTemp: averageTemperature }
		} catch (err) {
			console.error(err)
			return { error: 'Failed to load weather data.' }
		}
	},
}
