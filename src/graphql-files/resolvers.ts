require('dotenv').config({path:'.env'});

const User = require("../models/Users");
import { User,LoginInput,UserInput,Token,UserPass, JwtPayload, TokenInput } from "../interfaces";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const createJWT = (payload:JwtPayload,seed:string, expiresIn:string ):Token => {
  console.log('In the create',seed);
  return {token:jwt.sign(payload,seed,{ expiresIn })} as Token;

}

export const decodeJWT = async ( { token }:Token, seed:string ):Promise<JwtPayload> => {
    console.log(token,seed);
    const {id} = await jwt.verify(token,seed) as JwtPayload;
    return {id};
} 

export const resolvers = {
  
  Mutation: {
    addUser: async (_: any, { input }: UserInput):Promise<User | undefined> => {
      const { email, password } = input;

      const salt = await bcrypt.genSalt(10);
      
      input.password= await bcrypt.hash(password,salt);

      const existUser = await User.findOne({ email });
      if (existUser) {
        throw new Error(`the user with email:${email} exist`);
      }

      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    },
    login: async (_: any, { input }: LoginInput ):Promise<Token> => { 
      
      const { email, password } =input;

      const existUser:UserPass = await User.findOne({ email });
      
      if (!existUser) {
        throw new Error(`user or password incorrecto ${email}`)
      }

      if(!await bcrypt.compare(password,existUser.password)){
        throw new Error(`user or password incorrecto Pass`)
      }
      
      const payload:JwtPayload={
        id:existUser.id
      }     

      return createJWT(payload,process.env.JWT_SEED!,'1h');
     }
  },

  Query: {
    getUsers: async (): Promise<[User]> => {
      return await User.find({});
    },
    getUser: async (_: any,{ input }:TokenInput): Promise<User> => {
      
      return await User.find({id:decodeJWT( input,process.env.JWT_SEED! )});
    }  
  },
};


