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

<div class="container px-2 my-2 mx-auto flex gap-2 items-start">
    <div id="sidebar" class="flex-shrink-0 p-3 border w-max sticky top-0">
        <h1 class="text-xl mb-2 font-semibold">Filters</h1>
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
                    <input type="range" name="price-cap" id="price-cap" step="100" min="0" max="1000" bind:value={cap}>
                    <span>{cap}</span>
                </div>
            </fieldset>
            <hr>
            <input type="submit" class:cursor-not-allowed={loading} class:opacity-50={loading} disabled={loading} class="mt-3 w-full p-1 bg-green-700 text-white rounded-lg font-bold" value="Apply" />
        </form>
    </div>
    <main class="w-full flex-grow border p-4 relative">
        <h1 class="font-semibold mb-2">Showing {#if form?.success || data.products}{form?.products.length ?? data.products.length}{:else}{data.total}{/if}<!-- of {data.total}--> products</h1>
        <hr>
        <div id="search-results" class:opacity-50={loading} class="grid justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-2">
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