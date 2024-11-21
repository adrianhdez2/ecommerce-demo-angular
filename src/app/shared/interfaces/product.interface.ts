export interface Product {
    description: string;
    category: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number; }
    title: string;
}

export interface ProductItemCart {
    product: Product;
    quantity: number;
}