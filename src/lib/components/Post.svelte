<script>
    let { author, title, content } = $props()
</script>

<div class="border p-4 h-full bg-white">
    <p><span class="font-bold">Author: </span> {author}</p>
    <p><span class="font-bold">Title: </span> {title}</p>
    <p>{content}</p>
</div>