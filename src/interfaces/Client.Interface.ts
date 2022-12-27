import { Types } from "mongoose";
// import { User } from "./User.Interface";

export interface Client {
    name:string,
    lastName:string,
    business:string,
    email:string,
    phone?:string,
    createAt:Date,
    seller?:Types.ObjectId,
       
}

export interface ClientOutput{
    name:string,
    lastName:string,
    business:string,
    email:string,
    phone?:string,
    createAt:Date,
    seller?:Types.ObjectId
}

export interface ClientIn {
    name:string,
    lastName:string,
    business:string,
    email:string,
    phone?:string    
}