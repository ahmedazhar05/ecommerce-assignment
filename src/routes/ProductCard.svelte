<script lang="ts">
    import { cart } from '$lib/cart';

    export let id: number;
    export let price: number;
    export let title: string;
    export let image: string;
    export let rating: {
        rate: number;
        count: number;
    }

    $: added = $cart.has(id);
</script>

<div class="flex flex-col max-w-64 p-2 sm:p-1 border-transparent border hover:border-gray-200 rounded justify-between overflow-hidden">
    <div class="flex items-center justify-center h-full w-full max-h-64">
        <img class="max-h-full max-w-full" src={image} alt="{title} product image">
    </div>
    <div class="sm:p-2">
        <h1 class="font-semibold">{title}</h1>
        <div class="font-semibold text-lg">&#8377;&nbsp;{price.toFixed(2)}</div>
        <div class="flex items-center gap-2 justify-end">
            <div class="flex">
                {#each Array(5).fill(24) as w, i}
                {@const rate = i + 1 < rating.rate ? w : (rating.rate - i > 0 ? rating.rate - i : 0) * w}
                <svg viewBox="0 0 24 24" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" class="size-4">
                    <defs>
                        <mask id="{id}-mask-{i}">
                            <rect x="0" y="0" width={rate} height="24" fill="white" />
                        </mask>
                    </defs>
                    <path fill="gold" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" mask="url(#{id}-mask-{i})" />
                    <path fill="none" stroke="orangered" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                {/each}
            </div>
            <span class="text-sm">{rating.count} ratings</span>
        </div>
        <button class:bg-[orangered]={added} class:bg-[goldenrod]={!added} class="hover:bg-opacity-85 text-white p-1 w-full mt-2" on:click={() => {added ? cart.remove(id) : cart.add(id)}}>
        {#if added}
        Remove from Cart
        {:else}
        Add to Cart
        {/if}
        </button>
    </div>
</div>