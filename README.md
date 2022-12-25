# Node backend service
## A node backend services with node js, express js, typescript, mongodb and graphql

This is a simple backend services created with typescript and express js
To run this project in dev mode use the command **npm run dev**

If you want to run this project on your own machine, yo have to change the url connection to mongodb in the **app.ts** file.

###How to use the service

Graphql types and inputs

```typescript
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
    ```
