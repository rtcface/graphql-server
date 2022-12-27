import { Schema, model, Types } from 'mongoose';
import { Client as iClient } from '../interfaces';

const ClientSchema = new Schema<iClient>({
    name: {
        type:String,
        required:true,
        trim:true 
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    business:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        trim:true
    },
    createAt:{
        type: Date,
        default:Date.now
    },
    seller:{
        type: Types.ObjectId,
        required:true,
        ref:'User'
    }
});

export const Client = model<iClient>('Client',ClientSchema);