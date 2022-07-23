/* import { ObjectId } from "mongodb"; */
import mongoose from "mongoose";
import path from "path";

const coverImageBasePath = 'uploads/productCover';

const productSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,
            required: true
        },
        date:
        {
            type:Date,
            required: true
        },
        coverImageName:
        {
            type:String,
            required:true
        },
        quantity:
        {
            type:Number,
            required: true
        },
        price:
        {
            type:Number,
            required: true
        },
        brand:
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'Brand'
        }
    }
);

productSchema.virtual('coverImagePath').get(function()
{
    if(this.coverImageName !==null)
    {
       return path.join('/public',coverImageBasePath,this.coverImageName)     
    }
})

const Product = mongoose.model('Product',productSchema);

export {Product,coverImageBasePath}