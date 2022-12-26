import { Product, ProductBy } from '.';

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