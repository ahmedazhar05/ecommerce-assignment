<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import ProductCard from './ProductCard.svelte';

    export let data: PageData;
    // : {
    //     total: number;
    //     categories: string[];
    // };

    export let form: ActionData;
</script>

<div class="container my-2 mx-auto flex gap-2">
    <div id="sidebar" class="flex-shrink-0 p-3 border w-max">
        <h1 class="text-xl mb-2 font-semibold">Filters</h1>
        <hr>
        <form method="POST" action="?/filter" use:enhance>
            <fieldset class="my-2 text-sm">
                <legend class="text-base font-semibold mb-2">Categories:</legend>
                {#each data.categories as category}
                    {@const cid = category.replace(/[\W\s]+/, '_')}
                    <div class="flex items-center gap-2">
                        <input class="peer accent-[#ff2422] rounded" type="checkbox" name="category" id="category-{cid}" value={category} checked>
                        <label for="category-{cid}" class="peer-checked:font-semibold">{category.replace(/(^| )(.)/gm, (_, p, char) => `${p}${char.toUpperCase()}`)}</label>
                    </div>
                {/each}
            </fieldset>
            <hr>
            <fieldset class="my-2 text-sm">
                <legend class="text-base font-semibold mb-2">Price Range:</legend>
                <div class="flex items-center gap-2">
                    <span>0</span>
                    <input type="range" name="price-range" id="price-range" step="100" min="0" max="1000" value="1000">
                    <span>1000</span>
                </div>
            </fieldset>
            <hr>
            <button type="submit" class="mt-3 w-full p-1 bg-green-700 text-white rounded-lg font-bold">Apply</button>
        </form>
    </div>
    <main class="w-full flex-grow border p-4">
        <h1 class="font-semibold mb-2">Showing 1-40 of {data.total} products</h1>
        <hr>
        <div id="search-results" class="grid mt-2 gap-2">
            <ProductCard/>
        </div>
    </main>
</div>