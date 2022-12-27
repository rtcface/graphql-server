import { GraphQLError } from 'graphql';
import { Product, User, Client
 } from "../models";
import {
  User as iUser,
  LoginInput,
  UserInput,
  Token,
  JwtPayload,
  TokenInput,
  Product as iProduct,
  ProductByInput,
  ProductInput,
  UpdateProductInput,
  DeleteProductInput,
  ClientOutput,
  ClientInput
} from "../interfaces";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Types } from 'mongoose';
import { MyContext } from '../interfaces/Context.interface';


require("dotenv").config({ path: ".env" });

/* #region JWT FUNTIONS  */
export const createJWT = (
  payload: JwtPayload,
  seed: string,
  expiresIn: string
): Token => {
  console.log("In the create", seed);
  return { token: jwt.sign(payload, seed, { expiresIn }) } as Token;
};

export const decodeJWT = async (
  { token }: Token,
  seed: string
): Promise<JwtPayload> => {
  console.log(token, seed);
  const { id } = (await jwt.verify(token, seed)) as JwtPayload;
  console.log("-----------------", id);
  return { id };
};
/* #endregion */

export const resolvers = {
  Mutation: {
    /* #region  Users Funtions  */
    addUser: async (
      _: any,
      { input }: UserInput
    ): Promise<iUser | undefined> => {
      const { email, password } = input;

      const salt = await bcrypt.genSalt(10);

      input.password = await bcrypt.hash(password, salt);

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
    login: async (_: any, { input }: LoginInput): Promise<Token> => {
      const { email, password } = input;

      const existUser = await User.findOne({ email });

      if (!existUser) {
        throw new GraphQLError(`user or password incorrecto ${email}`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });        
      }

      if (!(await bcrypt.compare(password, existUser.password))) {
        throw new Error(`user or password incorrecto Pass`);
      }

      const payload: JwtPayload = {
        id: existUser.id,
      };

      return createJWT(payload, process.env.JWT_SEED!, "1h");
    },
    /* #endregion */

    /* #region  Product Funtions */
    addProduct: async (
      _: any,
      { input }: ProductInput
    ): Promise<iProduct | undefined> => {
      try {
        const product = new Product(input);
        product.save();
        return product;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    },
    updateProduct: async (
      _: any,
      { id, input }: UpdateProductInput
    ): Promise<iProduct | undefined | null> => {
      try {
        let product = await Product.findOne({ id });

        if (!product)
          throw new Error(`the product with id: ${id} is not exists`);

        product = await Product.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });

        return product;
      } catch (error) {
        console.log(error);
      }
      return undefined;
    },
    deleteProduct: async (
      _: any,
      { id }: DeleteProductInput
    ): Promise<Boolean> => {
      try {
        let product = await Product.findById(id);

        if (!product) throw new Error(`the product with id ${id} is not exist`);

        await Product.findOneAndDelete({ _id: id });

        return true;
      } catch (error) {
        throw new Error(`the product with id ${id} is not exist`);
      }
      return false;
    },
    /* #endregion */
  
    addClient:async (_:any,{ input }:ClientInput, {id}:MyContext):Promise<ClientOutput | undefined> => {
      const { email } = input;
      try {
      const existUser = await Client.findOne({ email });
      if (existUser) {
        throw new Error(`the user with email:${email} exist`);
      }
      const client = new Client(input);
      if(id){
        client.seller=new Types.ObjectId(id);
      }
     
      const res= await client.save();

      return res;
      

      } catch (error) {
        
      }
      return undefined;
    }
  
  },

  Query: {
    // Users
    getUsers: async (): Promise<iUser[]> => {
      return await User.find({});
    },
    getUser: async (_: any, { input }: TokenInput): Promise<{ id: string }> => {
      return await decodeJWT(input, process.env.JWT_SEED!);
    },
    //  Products
    getProducts: async () => {
      return await Product.find({});
    },
    getProduct: async (_: any, { input }: ProductByInput) => {
      const { id } = input;
      const product = await Product.findOne({ id });
      if (!product) throw new Error(`the product with id: ${id} is not exists`);

      return product;
    },
  },
};
