# Node backend service
## A node backend service with node js, express js, typescript, JWT, mongodb and graphql

This is a simple backend services created with typescript and express js.

To run this project in dev mode use the command **npm install to download all the dependencies and then npm run dev**

If you want to run this project on your own machine, yo have to change the url connection to mongodb in the **app.ts** file.

### How to use the service

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
 
Graphql querys and mutations

```typescript
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
```

**Example using Postman to fetch all the products**

```graphql
query {
    products {
        _id
        name
        description
        price
        creator {
            _id
            name
            email
        }
    }
}
```


