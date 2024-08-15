import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
	return {
        total: 20,
        categories: [
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing"
        ]
    }
};

export const actions = {
	filter: async (event) => {
		console.log(event)
	},
} satisfies Actions;