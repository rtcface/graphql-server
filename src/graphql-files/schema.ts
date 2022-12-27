export const typeDefs = `

  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createAt: String
  }

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createAt: String
  }

  type Client{
    id: ID
    name: String
    lastName: String
    email: String
    phone: String
    business: String
    createAt: String
    seller: ID    
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

  input ClientInput{
    name: String!
    lastName: String!
    email: String!
    phone: String    
    business: String!
  }

  type Mutation {
    # Users
    addUser(input: UserInput!) : User,
    login(input: LoginInput!): Token,
    
    #Products
    addProduct(input: ProductInput!) : Product,
    updateProduct(id:ID!,input: ProductInput! ) : Product
    deleteProduct(id:ID!): Boolean

    #Clients
    addClient(input:ClientInput!) : Client
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