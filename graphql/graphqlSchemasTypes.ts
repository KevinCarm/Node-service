export type User = {
    _id: number;
    name: string;
    email: string;
    password: string;
    products: Product[];
};

export type UserInput = {
    name: string;
    email: string;
    password: string;
};

export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    creator: User;
};
