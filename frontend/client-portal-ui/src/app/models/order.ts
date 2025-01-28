export interface Order {
    id: number;
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    quantity: number;
    status: string;
    createdAt: Date;
}