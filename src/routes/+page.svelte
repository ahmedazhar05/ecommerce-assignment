<script lang="ts">
    export let data: {
        total: number;
        categories: string[];
    };
</script>

<div class="container my-2 mx-auto flex gap-2">
    <div id="sidebar" class="flex-shrink-0 p-3 border w-max">
        <h1 class="text-xl mb-2 font-semibold">Filters</h1>
        <hr>
        <form>
            <fieldset class="my-2 text-sm">
                <legend class="text-base font-semibold mb-2">Categories:</legend>
                {#each data.categories as category}
                    {@const cid = category.replace(/\W+/, '_')}
                    <div class="flex items-center gap-2">
                        <input class="peer accent-[#ff2422] rounded" type="checkbox" name="category" id="category-{cid}" checked>
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
        </form>
    </div>
    <main class="w-full flex-grow border p-4">
        <h1 class="font-semibold mb-2">Showing 1-40 of {data.total} products</h1>
        <hr>
        <div id="search-results" class="grid">
            <div class="flex flex-col">
            </div>
        </div>
    </main>
</div>