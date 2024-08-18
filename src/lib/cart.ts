import { writable } from "svelte/store";

function initializeCart() {
	const { subscribe, set, update } = writable<Map<number, number>>(new Map());

	return {
		subscribe,
		add: (pid: number) => update(m => {
			m.set(pid, 1);
            return m;
        }),
	    remove: (pid: number) => update(m => {
            m.delete(pid);
            return m;
        }),
		reset: () => set(new Map())
	};
}

export const cart = initializeCart();