import { buildSchema } from "graphql";

export default buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
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
    }

    type RootQuery {
        login(email: String!, password: String!): LoginResponse!
        products: [Product!]!
        product(productId: ID!): Product!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
