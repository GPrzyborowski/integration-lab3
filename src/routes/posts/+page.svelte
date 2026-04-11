<script>
    import Header from "$lib/components/Header.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Post from "$lib/components/Post.svelte";
    let { data } = $props()
</script>

<Navbar />
<Header headerText='Posts'/>

<ol style="list-style-type: decimal; list-style-position: inside;" class="text-center">
    <p class="mt-12 mb-4 font-bold">Top 3 most active users:</p>
    {#each data.mostActiveUsers as user, i}
        <li><span class="font-bold">{user}</span>, number of posts: {data.top3PostCounts[i]}, average post length: {data.top3AvgPostLength[i]} characters</li>
    {/each}
</ol>
<p class="mt-12 ps-36 font-bold">Most active user's posts:</p>
<div class="w-full mt-6 grid grid-cols-3 gap-4 px-36">
    {#each data.topUserPosts as post}
        <Post 
            author={data.topUser.name} 
            title={post.title} 
            content={post.body} 
        />
    {/each}
</div>