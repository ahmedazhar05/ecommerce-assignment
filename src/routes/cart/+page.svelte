<script lang="ts">
    import { cart } from '$lib/cart';
    import CartItem from './CartItem.svelte';

    const sum = (total: number, num: number) => total + num;

    const discountCoupons: Record<string, number> = {
        ASSIGNMENT: 50,
        PASS: 100
    };

    let deliveryCharge = 0;
    let couponUsed = "ASSIGNMENT";
    $: discount = +total * (discountCoupons[couponUsed.toUpperCase()] ?? 0) / 100;
    let itemSum: Record<number, number> = {};

    $: total = Number(Object.values(itemSum).reduce(sum, 0)).toFixed(2);
    $: grandTotal = +total + +deliveryCharge.toFixed(2) - +discount.toFixed(2);

    cart.subscribe(vals => {
        for(const v in itemSum) {
            if(!vals.has(+v)) {
                delete itemSum[v];
                itemSum = itemSum;
            }
        }
    });
</script>

{#if $cart.size < 1}
<div class="bg-white py-12">
    <div class="container mx-auto my-0 flex flex-col items-center">
        <h1 class="text-4xl font-semibold mb-12 mx-8 text-center">There are not items in your Cart</h1>
        <span class="mb-5">Go back Home to add items to your cart</span>
        <a class="py-2 px-20 rounded-md bg-[orangered] text-white font-semibold" href="/">Go back home</a>
    </div>
</div>
{:else}
<div class="container mx-auto my-0 flex flex-col lg:flex-row lg:gap-2 px-2 items-start justify-center">
    <div class="w-full max-w-4xl py-2 bg-[gainsboro]">
        <div id="cart" class="flex flex-col border rounded-md bg-white">
            <div class="font-semibold p-2 border-b">
                <h1 class="text-xl inline-block">My Cart</h1>
                <span class="text-lg">({$cart.size} product{$cart.size > 1 ? 's' : ''})</span>
            </div>
            <div>
                {#each $cart as pid (pid)}
                <CartItem {pid} bind:sum={itemSum[pid]}/>
                {/each}
            </div>
            <div class="flex justify-end p-2">
                <a href="/" class="bg-[lightblue] py-2 px-4 rounded-md w-full sm:w-auto text-center">Continue with shopping</a>
            </div>
        </div>
    </div>
    <div class="sticky top-0 max-w-full lg:max-w-[22rem] w-full lg:pt-2 pb-2">
        <div id="order-summary" class="flex flex-col rounded-md border bg-white">
            <h1 class="text-lg p-2 border-b font-semibold">Price Details</h1>
            <div class="grid gap-2 p-2 grid-cols-[auto_max-content]">
                <span>Subtotal ({$cart.size} item{$cart.size > 1 ? 's' : ''})</span>
                <span class="text-end">&#8377;&nbsp;{total}</span>
    
                <span>Delivery charges</span>
                {#if deliveryCharge}
                <span>&#8377;&nbsp;{deliveryCharge}</span>
                {:else}
                <span class="text-green-700 font-semibold text-end">FREE</span>
                {/if}
                
                <span>Discount <input class="font-mono px-2 py-0.5 rounded" type="text" size="10" placeholder="COUPON" bind:value={couponUsed}> {discountCoupons[couponUsed.toUpperCase()] ?? 0}% off</span>
                <span class="text-end text-green-700">-&#8377;&nbsp;{discount.toFixed(2)}</span>
            </div>
            <div class="grid gap-2 p-2 grid-cols-[auto_max-content] border-t font-semibold">
                <span>Total</span>
                <span class="text-end">&#8377;&nbsp;{grandTotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-end lg:justify-center border-t font-semibold p-2">
                <button class="bg-[goldenrod] py-2 px-4 rounded-md w-full sm:w-auto lg:w-full text-white">Proceed to Checkout</button>
            </div>
        </div>
    </div>
</div>
{/if}