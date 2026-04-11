<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
    import Header from "$lib/components/Header.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Chart from 'chart.js/auto'
    let { form } = $props()
    let cityValue = $state('')
    let cityToDisplay = $state('')
    let chart: Chart
    let hours: string[] = []
    let canvas: HTMLCanvasElement = $state(null!)

    $effect(() => {
        if(form && canvas) {
            if(chart) {
                chart.destroy
            }
            hours = form.forecast.hourly.time.map((date: string) => {
                const hour = new Date(date).getHours();
                return `${String(hour).padStart(2, '0')}:00`;
            });
            chart = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: hours,
                    datasets: [
                        {
                            label: 'Hourly temperature',
                            data: form.forecast.hourly.temperature_2m
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: `°C`
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: `Hour`
                            }
                        }
                    }
                }
            })
        }
    })

</script>

<Navbar />
<Header headerText='Weather'/>

<form method="POST" action="?/weather" use:enhance class="flex flex-col items-center">
    <div class="flex flex-col mt-12 mb-4">
        <label for="city">City:</label>
        <input id="city" name="city" type="text" bind:value={cityValue} class="border px-2 py-1">
    </div>
    <div>
        <button onclick={() => cityToDisplay = cityValue} type="submit" class="border px-2 py-1 cursor-pointer hover:text-white hover:bg-black duration-100">Show weather</button>
    </div>
</form>

<div class="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 w-full px-4 my-12">
    <div class="h-[400px] flex flex-col items-center">
        {#if form}
            <p class="mb-5 text-lg">Temperature for the next 24 hours in <span class="font-bold">{cityToDisplay}</span></p>
            <canvas bind:this={canvas}></canvas>
        {/if}
    </div>
    <div class="h-[400px] mt-18">
        {#if form}
            <p class="mb-2">Current temperature: <span class="font-bold">{form?.forecast.hourly.temperature_2m[0]}°C</span></p>
            <p class="mb-6">Average temperature for today: <span class="font-bold">{form?.averageTemp}</span></p>
            <p class="pe-24 text-justify">{form?.response}</p>
        {/if}
    </div>
</div>