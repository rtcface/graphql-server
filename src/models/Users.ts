import { Schema, model } from 'mongoose';
import { User as iUser } from '../interfaces'; 


const UsersSchema = new Schema<iUser>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

export const User = model<iUser>('User', UsersSchema);