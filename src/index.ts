import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers,typeDefs } from './graphql-files';
import { dbConnect } from './config/dbConecction';


export interface Context {
  username: string
}

dbConnect();

const server = new ApolloServer({
    typeDefs,
    resolvers
  });  
 
  startStandaloneServer(server, { listen: { port: 4000 }, }).then( ( { url } ) => {       
    console.log(`🚀  Server ready at: ${ url } `);
  } ) ;

  