import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getProduct } from '$lib/server/db_logic';

export const GET: RequestHandler = async ({ params: { pid } }) => {
	return json(await getProduct(+pid));
};