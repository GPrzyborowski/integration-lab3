import type { RequestEvent } from '../$types'

export const actions = {
	weather: async ({ request }: RequestEvent) => {
		const data = await request.formData()
        const city = data.get('city')
        const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        const geoRes = await geo.json()
        const geoResPrepared = geoRes.results[0]
        const forecast = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoResPrepared.latitude}&longitude=${geoResPrepared.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1`)
        const forecastData = await forecast.json()
        return { forecast: forecastData }
	},
}