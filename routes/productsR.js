import express from "express";
import { Product,imageBasePath} from "../models/productM.js";
import { Brand } from "../models/brandsM.js";
import fs from "fs";

import multer from "multer";
import path from "path";

const uploadPath = path.join('public',imageBasePath);
const mimeTypes = ['image/jpeg','image/png','image/gif']
const upload = multer(
    {
       dest: uploadPath,
       fileFilter: (req,file,callback)=>
       {
        callback(null,mimeTypes.includes(file.mimetype));
       }
    }
)

const productsRouter = express.Router();

productsRouter.get('/',async(req,res)=>
{
    try
    {
        const products = await Product.find({});
        res.render('./products/indexV',
        {
            products,
        })
        
    }
    catch
    {
        res.redirect('/')
    }

   /*  try
    {
      
    }
    catch(err)
    {

    } */

});

productsRouter.get('/new',async(req,res)=>
{
    renderNewPage(res,new Product());
});

productsRouter.post('/',upload.array('cover',12),async(req,res)=>
{
    const fileNames = req.files || null

    const product = new Product(
        {
            name:req.body.name,
            price:req.body.price,
            date:new Date(req.body.date),
            quantity:req.body.quantity,
            brand:req.body.brand,
            type:req.body.type,
            coverImageName:fileNames[0].filename,
            imageName:fileNames[1].filename,
        }
    )
 
    try
    {
        const newProduct = await product.save();
        res.redirect('./products');
    }
    catch(err)
    {
        console.log(err)
        if(product.coverImageName !== undefined)
        {
           removeProductCover(product.coverImageName);
           removeProductCover(product.imageName);
        }
        renderNewPage(res,product,true)
    }
})


function removeProductCover(fileName)
{
    fs.unlink(path.join(uploadPath,fileName),err=>
    {
        console.error(err);
    })
}
async function renderNewPage(res,product,hasError=false)
{
    try
    {
        const brands = await Brand.find();
        const params=
        {
            product,
            brands,
        }
        if(hasError)
        {
            params.errorMessage = 'an error has occureed';
        }
        res.render('./products/newV',params);
    }
    catch
    {
        res.redirect('./products');
    }
    
}
export {productsRouter}

