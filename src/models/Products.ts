 //const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';
import { Product as iProduct } from '../interfaces';

 const ProductsSchema = new Schema<iProduct>({
   
    name:{
        type: String,
        require: true,
        trim: true
    },
    stock:{
        type: Number,
        require: true,
        trim: true
    },
    price:{
        type: Number,
        require: true,
        trim: true
    },
    create:{
        type: Date,
        default: Date.now
    }
  });

  export const Product = model<iProduct>('Product', ProductsSchema);

