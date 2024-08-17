<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import ProductCard from './ProductCard.svelte';

    const toCamelCase = (line: string) => line.replace(/(^| )(.)/gm, (_, pre, char) => `${pre}${char.toUpperCase()}`);

    let cap = 1000;
    export let data: PageData;
    export let form: ActionData;

    let loading = false;
</script>

<div class="container p-2 mx-auto flex flex-col sm:flex-row gap-2 items-start">
    <details open id="sidebar" class="group flex-shrink-0 p-3 border sticky top-0 bg-white rounded z-10 w-full sm:w-max md:w-64">
        <summary class="text-xl mb-0 group-open:mb-2 font-semibold flex justify-between items-center">
            <span>Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="group-[&:not([open])]:hidden sm:hidden size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>                  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="group-open:hidden sm:group-open:block size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>              
        </summary>
        <hr>
        <form method="POST" action="?/filter" use:enhance={() => {
            loading = true;
            return async ({ update }) => {
                await update({ reset: false });
                loading = false;
            }
        }}>
            <fieldset class="my-2 text-sm">
                <legend class="text-base font-semibold mb-2">Categories:</legend>
                {#each data.categories as category}
                    {@const cid = category.replace(/[\W\s]+/, '_')}
                    <div class="flex items-center gap-2">
                        <input class="peer accent-[#ff2422] rounded" type="checkbox" name="category" id="category-{cid}" value={category} checked>
                        <label for="category-{cid}" class="peer-checked:font-semibold">{toCamelCase(category)}</label>
                    </div>
                {/each}
            </fieldset>
            <hr>
            <fieldset class="my-2 text-sm">
                <legend class="text-base font-semibold mb-2">Price Limit:</legend>
                <div class="flex items-center gap-2">
                    <input type="range" name="price-cap" id="price-cap" class="w-full" step="100" min="0" max="1000" bind:value={cap}>
                    <span>{cap}</span>
                </div>
            </fieldset>
            <hr>
            <input type="submit" class:cursor-not-allowed={loading} class:opacity-50={loading} disabled={loading} class="mt-3 w-full p-1 bg-green-700 text-white rounded font-bold" value="Apply" />
        </form>
    </details>
    <main class="w-full flex-grow border p-4 relative bg-white rounded">
        <h1 class="font-semibold mb-2">Showing {#if form?.success || data.products}{form?.products.length ?? data.products.length}{:else}{data.total}{/if}<!-- of {data.total}--> products</h1>
        <hr>
        <div id="search-results" class:opacity-50={loading} class="grid justify-items-stretch grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-2">
            {#if form?.success || data.products}
                {#each form?.products ?? data.products as product}
                    <ProductCard {...product}/>
                {/each}
            {/if}
        </div>
        <div class:hidden={!loading} class:block={loading} class="absolute top-0 left-0 w-full h-full">
            <svg class="animate-spin h-8 w-8 text-red-600 sticky top-1/2 left-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    </main>
</div>