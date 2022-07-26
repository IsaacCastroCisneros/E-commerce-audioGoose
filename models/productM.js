/* import { ObjectId } from "mongodb"; */
import mongoose from "mongoose";
import path from "path";

const imageBasePath = 'uploads/productCover'

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
        imageName:
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
        type:
        {
           type:String,
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

productSchema.virtual('coverPath').get(function()
{
    if(this.coverImageName!==null && this.coverImageName!==undefined)
    {
        return path.join('/public',imageBasePath,this.coverImageName)
    }
});
productSchema.virtual('imagePath').get(function()
{
    if(this.imageName!==null && this.imageName!==undefined)
    {
        return path.join('/public',imageBasePath,this.imageName)
    }
});

const Product = mongoose.model('Product',productSchema);
export {Product,imageBasePath}