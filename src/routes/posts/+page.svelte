<script lang='ts'>
    import Header from "$lib/components/Header.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Post from "$lib/components/Post.svelte";
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
    let { data } = $props()
    let chart: Chart
    let canvas: HTMLCanvasElement = $state(null!)

$effect(() => {
        if(canvas) {    
            if(chart) {
                chart.destroy
            }
            chart = new Chart(canvas, {
                type: 'doughnut',
                data: {
                   labels: data.mostActiveUsers,
                        datasets: [{
                            label: 'Number of posts',
                            data: data.top3PostCounts,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Posts by top 3 users",
                            position: 'bottom'
                        }
                    }
                }
            }
        )
    }
})

</script>

<Navbar />
<Header headerText='Posts'/>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-0">
    <div class="lg:col-start-2">
        <ol style="list-style-type: decimal; list-style-position: inside;" class="text-center">
            <p class="mt-12 mb-4 font-bold">Top 3 most active users:</p>
            {#each data.mostActiveUsers as user, i}
                <li><span class="font-bold">{user}</span>, number of posts: {data.top3PostCounts[i]}, average post length: {data.top3AvgPostLength[i]} characters</li>
            {/each}
        </ol>
    </div>
    <div class="lg:col-start-3 flex justify-center">
        <canvas bind:this={canvas} class="max-w-[250px] max-h-[250px]"></canvas>
    </div>
</div>
<p class="mt-12 text-center lg:text-left lg:ps-36 font-bold">Most active user's posts:</p>
<div class="w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 px-6 lg:px-36">
    {#each data.topUserPosts as post}
        <Post 
            author={data.topUser.name} 
            title={post.title} 
            content={post.body} 
        />
    {/each}
</div>