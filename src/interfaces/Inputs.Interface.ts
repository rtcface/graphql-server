
import { Product, ProductBy } from '.';
import { User, Login, Token } from '.';

export interface UserInput{
    input:User
}

export interface LoginInput{
    input:Login
}

export interface TokenInput{
    input:Token
}

export interface ProductInput{
    input:Product
}

export interface ProductByInput{
    input:ProductBy
}

export interface UpdateProductInput{
    id: string,
    input:Product
}

export interface DeleteProductInput{
    id:string
}