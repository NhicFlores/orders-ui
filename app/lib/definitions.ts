export type User = {
    id: string;
    name: string; 
    email: string;
    password: string;
};

export type Customer = {
    id: string;
    name: string;
    email: string;
};

export type Order = {
    id: string;
    customer_id: string;
    order_name: string;
    product_id: string;
    amount: number;
    price: number,
    date: string;
    status: 'pending' | 'draft' | 'shipped' | 'processing';
};