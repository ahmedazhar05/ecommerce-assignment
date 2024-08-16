const BASE_FETCH = 'https://fakestoreapi.com';

function fetchDBFromURL(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(BASE_FETCH + url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
}

export function getAllProducts(): Promise<Product[]> {
    return fetchDBFromURL('/products');
}

export function getTotalProductCount(): Promise<Product['id']> {
    return new Promise((resolve, reject) => {
        getAllProducts()
        .then(products => resolve(products.length))
        .catch(err => reject(err));
    })
}

export function getAllCategories(): Promise<Category[]> {
    return fetchDBFromURL('/products/categories');
}

export function getProduct(pid: number): Promise<Product> {
    return fetchDBFromURL('/products/' + pid);
}

export function getProductByFilter(categories: Category[], price_cap?: Product['price']): Promise<Product[]> {
    // Filter Criteria = [Product should belong to any one of the given categories] and [if there is a price_cap then the Product price should be <= the given cap]
    const filterCriteria = (product: Product) => categories.includes(product.category) && (!price_cap || product.price <= price_cap);

    return new Promise((resolve, reject) => {
        getAllProducts()
        .then(products => resolve(products.filter(filterCriteria)))
        .catch(err => reject(err));
    });
}