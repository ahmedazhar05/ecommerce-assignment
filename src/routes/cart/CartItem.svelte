<script lang="ts">
    import { getProduct } from "$lib";
    import { cart } from "$lib/cart";

    export let pid: number;

    let itemInfo = getProduct(pid);
    let quantity = 1;
</script>

{#await itemInfo}
<div class="flex w-full h-[170px] items-center justify-center">
    <svg class="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
</div>
{:then product}
<div class="flex w-full hover:bg-[#f6f6f6]">
    <div class="flex gap-2 p-3">
        <div class="flex flex-col gap-5 h-full w-40 justify-between">
            <div class="flex items-center justify-center grow-0 shrink-1">
                <img class="max-w-full h-[100px]" src={product.image} alt="product image">
            </div>
            <div class="shrink-0 flex justify-center">
                <button class:cursor-not-allowed={quantity < 2} class:opacity-50={quantity < 2} class="flex items-center justify-center aspect-square text-base bg-slate-100 hover:bg-slate-300 border border-[darkgray] text-center rounded-full w-[3ch]" disabled={quantity < 2} on:click={() => quantity--}><span>&ndash;</span></button>
                <span class="bg-white w-2/6 text-center border border-[darkgray] mx-3">{quantity}</span>
                <button class="flex items-center justify-center aspect-square text-base bg-slate-100 hover:bg-slate-300 border border-[darkgray] text-center rounded-full w-[3ch]" on:click={() => quantity++}><span>+</span></button>
            </div>
        </div>
    </div>
    <div class="flex flex-col p-2 justify-between w-full gap-2">
        <div>
            <h1 class="mb-2 font-semibold text-xl">{product.title}</h1>
            <div class="font-semibold mb-3">Price: &#8377;&nbsp;{product.price}</div>
            <div class="text-sm flex gap-3">
                <div>Rating: <strong>{product.rating.rate}</strong></div>
                <div class="flex items-center gap-2">
                    <div class="flex">
                        {#each Array(5).fill(24) as w, i}
                        {@const rate = i + 1 < product.rating.rate ? w : (product.rating.rate - i > 0 ? product.rating.rate - i : 0) * w}
                        <svg viewBox="0 0 24 24" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" class="size-4">
                            <defs>
                                <mask id="{pid}-mask-{i}">
                                    <rect x="0" y="0" width={rate} height="24" fill="white" />
                                </mask>
                            </defs>
                            <path fill="gold" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" mask="url(#{pid}-mask-{i})" />
                            <path fill="none" stroke="orangered" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        {/each}
                    </div>
                    <span class="text-sm">{product.rating.count} ratings</span>
                </div>
            </div>
        </div>
        <div>
            <button class="flex items-center px-3 py-1 bg-white hover:bg-red-200 border rounded-md gap-1" on:click={() => cart.remove(pid)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>                          
                <span>Remove from Cart</span>
            </button>
        </div>
    </div>
</div>
{/await}