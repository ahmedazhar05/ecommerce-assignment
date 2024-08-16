import { getProductByFilter, getTotalProductCount, getAllCategories } from '$lib/server/db_logic';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
    return {
        total: await getTotalProductCount(),
        categories: await getAllCategories()
    }
};

export const actions = {
	filter: async ({ request }) => {
		const req_filters = await request.formData();
        const categories = req_filters.getAll('category') as Category[];
        const price_cap = +`${req_filters.get('price-cap')}` as number;

        return {
            success: true,
            products: await getProductByFilter(categories, price_cap)
        }
	},
} satisfies Actions;