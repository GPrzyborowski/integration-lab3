import axios from 'axios'

type Props = {
	arr: number[]
	x: number
	user: string
}

export async function load() {
	try {
		const postsRes = await axios.get('https://jsonplaceholder.typicode.com/posts')
		if (postsRes.status !== 200) {
			throw new Error(`Failed to fetch posts: ${postsRes.status}`)
		}
		const posts = postsRes.data
		const numberOfPostsToEliminate = 75
		for (let i = 0; i < numberOfPostsToEliminate; i++) {
			let randomIndex = Math.floor(Math.random() * posts.length)
			posts.splice(randomIndex, 1)
		}
		const result = posts.reduce((acc: Record<number, number>, current: { userId: number }) => {
			if (!acc[current.userId]) {
				acc[current.userId] = 0
			}
			acc[current.userId] += 1
			return acc
		}, {})
		const top3 = Object.keys(result)
			.sort((a, b) => result[b] - result[a])
			.slice(0, 3)
		const resultTopUsersId = top3.map(Number)
		const top3PostCounts = resultTopUsersId.map(id => result[id])
		const top3AvgPostLength = resultTopUsersId.map(id => {
			const userPosts = posts.filter((post: { userId: number; body: string }) => post.userId == id)
			const avgLength =
				userPosts.reduce((sum: number, post: { body: string }) => sum + post.body.length, 0) / userPosts.length
			return Math.round(avgLength)
		})
		const usersRes = await axios.get('https://jsonplaceholder.typicode.com/users')
		if (usersRes.status !== 200) {
			throw new Error(`Failed to fetch users: ${usersRes.status}`)
		}
		const users = usersRes.data
		const resultTopUsersNames = resultTopUsersId.map(id => {
			return users.find((user: { id: number; name: string }) => user.id == id).name
		})
		const topUser = users.find((user: { id: number }) => user.id == resultTopUsersId[0])
		const topUserPosts = posts.filter((post: { userId: number }) => post.userId == topUser.id)

		return {
			mostActiveUsers: resultTopUsersNames,
			topUser: topUser,
			topUserPosts: topUserPosts,
			top3PostCounts: top3PostCounts,
			top3AvgPostLength: top3AvgPostLength,
		}
	} catch (err) {
		console.error(err)
		return { mostActiveUsers: [], topUser: null, topUserPosts: [], top3PostCounts: [], top3AvgPostLength: [] }
	}
}
