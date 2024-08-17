export async function getProduct(id: number): Promise<Product> {
    const res = await fetch('/api/product/' + id)
    return await res.json();
}