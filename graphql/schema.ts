import { buildSchema } from "graphql";

export default buildSchema(`
    type Role {
        _id: ID!
        name: String
    }
    
    
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        roles: [Role!]!
        products: [Product!]!
    }

    type Product {
        _id: ID!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
        creator: User!
    }

    input ProductInput {
        name: String!
        description: String!
        price: Float!
        quantity: Int!
    }
    
    type LoginResponse {
        userId: ID!
        token: String!
    }


    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootMutation {
        registerUser(userInputData: UserInputData): User!
        createProduct(productInput: ProductInput!): Product!
        deleteProduct(productId: ID!): Product!
        updateProduct(productId: ID!, productInput: ProductInput!): Product!
        updateUser(userId: ID!, userInputData: UserInputData): User!
        addAdmin(userId: ID!, roleId: ID!): User!
    }

    type RootQuery {
        login(email: String!, password: String!): LoginResponse!
        products: [Product!]!
        product(productId: ID!): Product!
        roles: [Role!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
