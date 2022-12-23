export const typeDefs = `

  type User {
    id: ID
    name: String
    lastName: String
    email: String
    creat: String
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

  type Mutation {
    addUser(input: UserInput!) : User,
    login(input: LoginInput!): Token
  }

  type Query {
    getUsers : [User]
    getUser(input:TokenInput!): User
  }


  
`;