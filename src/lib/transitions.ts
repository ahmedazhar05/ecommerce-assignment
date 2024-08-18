import { cubicInOut } from "svelte/easing";
import { crossfade } from "svelte/transition";

export const [ send, receive ] = crossfade({
    easing: cubicInOut
});