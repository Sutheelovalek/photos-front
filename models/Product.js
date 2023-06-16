import { Schema, models, model } from "mongoose";
import mongoose from 'mongoose';

const ProductSchema = new Schema({
    title: {type: String, require: true},
    description: String,
    price: {type: Number, require: true},
    images: [{type: String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
