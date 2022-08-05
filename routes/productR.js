import express from "express";
import {Product} from "../models/productM.js";
import {Brand} from "../models/brandsM.js";

const productRouter = express.Router();

productRouter.get('/:id',async(req,res)=>
{
    try
    {
       const product = await Product.findById(req.params.id);
       const brand = await Brand.findById(product.brand);
       const products = await Product.find({type:product.type});

       for (let i = products.length -1; i > 0; i--) 
       {
         let j = Math.floor(Math.random() * i)
         let k = products[i]
         products[i] = products[j]
         products[j] = k
       }
       
       const productsRandom = products.slice(0,3);

       res.render('./products/productV',
       {
          product,
          brand,
          productsRandom
       });
    }
    catch
    {
       res.send('something wrong was happend');
    }
})

export{productRouter}