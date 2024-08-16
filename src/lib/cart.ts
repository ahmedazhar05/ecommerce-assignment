import { writable } from "svelte/store";

function initializeCart() {
	const { subscribe, set, update } = writable<Set<number>>(new Set());

	return {
		subscribe,
		add: (pid: number) => update(a => {
            a.add(pid);
            return a;
        }),
	    remove: (pid: number) => update(a => {
            a.delete(pid);
            return a;
        }),
		reset: () => set(new Set())
	};
}

export const cart = initializeCart();