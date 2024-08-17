<script>
    import "../app.css";
    import { cart } from '$lib/cart';
    import { page } from "$app/stores";
</script>

<header class="h-16 w-full shadow bg-white top-0 sticky z-10">
    <div class="container gap-3 flex justify-between mx-auto my-0 relative h-full p-3">
        <a href="/" class="brand h-full flex-shrink-0">
            <img class="h-full" src="https://p1.edge.duggup.com/logo/profile-transparent-blue.svg" alt="brand logo">
        </a>
        <!-- <div class="search-bar flex items-center">
            <input class="border border-solid py-1.5 rounded-l-lg border-inherit" type="search" placeholder="Search" name="search" id="search">
            <button class="hover:bg-gray-200 p-1.5 border border-solid rounded-r-lg border-l-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>                      
            </button>
        </div> -->
        {#if $page.url.pathname === '/cart'}
        <a href="/" class="hover:bg-gray-200 relative flex items-center text-lg border border-solid rounded-lg p-2">Home</a>
        {:else}
        <a href="/cart" class="hover:bg-gray-200 relative flex flex-row items-center gap-2 text-lg border border-solid rounded-lg p-2">
            <span>Cart</span>
            <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span class="absolute text-xs font-bold h-4 -top-2 -left-2 flex items-center justify-center text-white bg-[#ff2422] px-1 aspect-square rounded-full empty:hidden">{$cart.size <= 0 ? '' : $cart.size}</span>
        </a>
        {/if}
    </div>
</header>
<div class="overflow-auto bg-[gainsboro]">
    <slot />
</div>
<footer></footer>