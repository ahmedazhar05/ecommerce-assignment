<script lang="ts">
    import { cart } from '$lib/cart';
    import CartItem from './CartItem.svelte';
</script>

{#if $cart.size < 1}
<div class="container mx-auto my-0 flex flex-col items-center">
    <h1 class="text-4xl font-semibold my-12">There are not items in your Cart</h1>
    <span class="mb-5">Go back Home to add items to your cart</span>
    <a class="py-2 px-20 rounded-md bg-[orangered] text-white font-semibold" href="/">Go back home</a>
</div>
{:else}
<div class="container mx-auto my-0 flex gap-2 p-2">
    <div id="cart" class="flex flex-col border rounded-md w-full">
        <div class="font-semibold p-2 border-b">
            <h1 class="text-xl inline-block">My Cart</h1>
            <span class="text-lg">({$cart.size} product{$cart.size > 1 ? 's' : ''})</span>
        </div>
        <div>
            {#each $cart as pid (pid)}
            <CartItem {pid}/>
            {/each}
        </div>
    </div>
    <div id="order-summary" class="flex flex-col">

    </div>
</div>
{/if}