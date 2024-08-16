type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: `${typeof BASE_FETCH}/img/${string}.jpg`,
    rating: {
        rate: number,
        count: number
    }
};

type Category = Product['category'];