import type { PageServerLoad } from './$types';


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