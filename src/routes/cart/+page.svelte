<script lang="ts">
    import { cart } from '$lib/cart';
    import CartItem from './CartItem.svelte';

    const sum = (total: number, num: number) => total + num;

    let deliveryCharge = 0;
    let itemSum: Record<number, number> = {};

    $: total = Number(Object.values(itemSum).reduce(sum, 0)).toFixed(2);

    cart.subscribe(vals => {
        for(const v in itemSum) {
            if(!vals.has(+v)) {
                delete itemSum[v];
            }
        }
    });
</script>

{#if $cart.size < 1}
<div class="container mx-auto my-0 flex flex-col items-center">
    <h1 class="text-4xl font-semibold my-12">There are not items in your Cart</h1>
    <span class="mb-5">Go back Home to add items to your cart</span>
    <a class="py-2 px-20 rounded-md bg-[orangered] text-white font-semibold" href="/">Go back home</a>
</div>
{:else}
<div class="container mx-auto my-0 flex gap-2 p-2 items-start justify-center">
    <div id="cart" class="flex flex-col border rounded-md w-full max-w-4xl">
        <div class="font-semibold p-2 border-b">
            <h1 class="text-xl inline-block">My Cart</h1>
            <span class="text-lg">({$cart.size} product{$cart.size > 1 ? 's' : ''})</span>
        </div>
        <div>
            {#each $cart as pid (pid)}
            <CartItem {pid} bind:sum={itemSum[pid]}/>
            {/each}
        </div>
    </div>
    <div id="order-summary" class="flex flex-col max-w-80 w-full rounded-md border">
        <h1 class="text-lg p-2 border-b">Price Details</h1>
        <div class="grid gap-2 p-2 grid-cols-[auto_max-content]">
            <span>Price ({$cart.size} item{$cart.size > 1 ? 's' : ''})</span>
            <span class="text-end">&#8377;&nbsp;{total}</span>

            <span>Delivery charges</span>
            {#if deliveryCharge}
            <span>&#8377;&nbsp;{deliveryCharge}</span>
            {:else}
            <span class="text-green-700 font-semibold text-end">FREE</span>
            {/if}
        </div>
    </div>
</div>
{/if}