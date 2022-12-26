import { Types } from "mongoose"

export interface Product {
    name: string,
    stock: number,
    price: number,
    create: Date
}

export interface ProductOuput {
    id: Types.ObjectId,
    name: string,
    stock: number,
    price: number,
    create: string
}

export interface ProductBy {
    id: Types.ObjectId
}