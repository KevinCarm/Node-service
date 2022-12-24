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
    _id?: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    creator?: User;
};

export type LoginResponse = {
    userId: String;
    token: String;
};

export type Role = {
    _id: String;
    name: String; 
};
