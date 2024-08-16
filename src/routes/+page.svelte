<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import ProductCard from './ProductCard.svelte';

    const toCamelCase = (line: string) => line.replace(/(^| )(.)/gm, (_, pre, char) => `${pre}${char.toUpperCase()}`);

    let cap = 1000;
    let formElement: HTMLFormElement;
    // $: formElement?.submit();

    export let data: PageData;
    export let form: ActionData;
</script>

<div class="container my-2 mx-auto flex gap-2">
    <div id="sidebar" class="flex-shrink-0 p-3 border w-max">
        <h1 class="text-xl mb-2 font-semibold">Filters</h1>
        <hr>
        <form bind:this={formElement} method="POST" action="?/filter" use:enhance={() => async ({ update }) => update({ reset: false })}>
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
            <button type="submit" class="mt-3 w-full p-1 bg-green-700 text-white rounded-lg font-bold">Apply</button>
        </form>
    </div>
    <main class="w-full flex-grow border p-4">
        <h1 class="font-semibold mb-2">Showing {#if form?.success}{form.products.length}{:else}{data.total}{/if} of {data.total} products</h1>
        <hr>
        <div id="search-results" class="grid justify-items-stretch grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-2">
            {#if form?.success}
                {#each form?.products as product}
                    <ProductCard {...product}/>
                {/each}
            {/if}
        </div>
    </main>
</div>