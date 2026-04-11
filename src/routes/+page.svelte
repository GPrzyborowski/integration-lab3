<script>
    import Header from "$lib/components/Header.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    let { data } = $props()
</script>

<Navbar />
<Header headerText='Home page'/>
<div class="mt-16 flex flex-col items-center">
<p class="mb-2">Did you know?</p>
    <p class="px-4 mb-2 italic">{data.fact}</p>
    <img src={data.imageUrl} alt="dog" class="p-4 max-w-80vw max-h-[500px]">
</div>