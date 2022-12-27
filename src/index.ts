import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers,typeDefs } from './graphql-files';
import { dbConnect } from './config/dbConecction';
import { MyContext } from './interfaces/Context.interface';
import * as jwt from "jsonwebtoken";
import { JwtPayload } from './interfaces';

require("dotenv").config({ path: ".env" });

export interface Context {
  username: string
}

dbConnect();

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
  });  
 
  startStandaloneServer(server, { 
    listen: { port: 4000 },
    context: async ({ req }) => {

      const token = req.headers.authorization || '';
      if(token){
        try {
        const {id} = jwt.verify(token,process.env.JWT_SEED!) as JwtPayload;
        // console.log(id);
        return { id }
        } catch (error) {
          console.log(error);  
        }
      }

      return { id: '' }
     
    },
  }).then( ( { url } ) => {       
    console.log(`🚀  Server ready at: ${ url } `);
  } ) ;

  