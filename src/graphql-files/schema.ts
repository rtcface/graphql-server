export const typeDefs = `

  type User {
    id: ID
    name: String
    lastName: String
    email: String
    creat: String
  }

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    create: String
  }

  type UserId {
    id: ID
  }

  type Token {
    token: String
  }

  input UserInput{
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput{
    email: String!
    password: String!
  }

  input TokenInput{
    token:String!
  }

  input ProductInput{
    name: String!
    stock: Int!
    price: Float!
  }

  input ProductByInput{
    id:ID!
  }

  type Mutation {
    # Users
    addUser(input: UserInput!) : User,
    login(input: LoginInput!): Token,
    
    #Products
    addProduct(input: ProductInput!) : Product,
    updateProduct(id:ID!,input: ProductInput! ) : Product
    deleteProduct(id:ID!): Boolean
  }

  type Query {
    #Users
    getUsers : [User]
    getUser(input:TokenInput!): UserId
    #Producs 
    getProducts : [Product]
    getProduct(input:ProductByInput!) : Product
  }


  
`;