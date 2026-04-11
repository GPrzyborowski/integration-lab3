type Args = {
	temperatures: number[]
}

export function calculateAvg({ temperatures }: Args) {
	const averageTemp = Number((temperatures.reduce((sum, current) => sum + current, 0) / temperatures.length).toFixed(1))
    return averageTemp
}
