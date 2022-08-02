import express from "express";
import {Product} from "../models/productM.js"
const headphonesRouter = express.Router();


headphonesRouter.get('/', async(req, res)=> 
{
   try
   {
      /* const xbox = await Product.findById('62e0912605b0616b74a76971');
      const proX = await Product.findById('62e09a4871896d371d829a75');
      const xG435 = await Product.findById('62e0a30071896d371d829a7a'); */
      const proX = await Product.find({quantity:15});

     
     
      res.render('./headphones/indexV',{proX} /* ,
      {
         xbox,
         proX,
         xG435
      } */);
   }
   catch
   {
      res.send('an error has ocurred');
   }
   
})

/* headphonesRouter.get('/:id',async(req,res)=>
{
   try
   {
      const product = await Product.findById(req.params.id)
      res.render('./products/productV',{product})
   }
   catch
   {
      res.send('an error has ocurred');
   }
   
}) */

export {headphonesRouter}