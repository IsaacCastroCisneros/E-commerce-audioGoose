import mongoose from "mongoose";

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
        coverImage:
        {
            type:Buffer,
            required:true
        },
        coverImageType:
        {
            type:String,
            required:true
        },
        image:
        {
            type:Buffer,
            required:true
        },
        imageType:
        {
            type:String,
            required:true
        },
        image1:
        {
            type:Buffer,
            required:true
        },
        imageType1:
        {
            type:String,
            required:true
        },
        image2:
        {
            type:Buffer,
            required:true
        },
        imageType2:
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
        description:
        {
            type:String,
            require:true
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
    if(this.coverImage!==null && this.coverImageType!==undefined)
    {
        return `data:${this.coverImageType};charset-utf-8;base64,${this.coverImage.toString('base64')}`
    }
});
productSchema.virtual('imagePath').get(function()
{
    if(this.image!==null && this.imageType!==undefined)
    {
        return `data:${this.imageType};charset-utf-8;base64,${this.image.toString('base64')}`
    }
});
productSchema.virtual('image1Path').get(function()
{
    if(this.image1!==null && this.imageType1!==undefined)
    {
        return `data:${this.imageType1};charset-utf-8;base64,${this.image1.toString('base64')}`
    }
});
productSchema.virtual('image2Path').get(function()
{
    if(this.image2!==null && this.imageType2!==undefined)
    {
        return `data:${this.imageType2};charset-utf-8;base64,${this.image2.toString('base64')}`
    }
});


const Product = mongoose.model('Product',productSchema);
export {Product}