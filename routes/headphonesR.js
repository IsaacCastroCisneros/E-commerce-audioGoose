import express from "express";
import {Product} from "../models/productM.js";
const headphonesRouter = express.Router();


headphonesRouter.get('/', async(req, res)=> 
{
   try
   {
      const a10 = await Product.findOne({name:'A10'});
      const a20 = await Product.findById('62f2c1420b8e9e65df160745');
      const g435 = await Product.findById('62f2c1df0b8e9e65df16074a');
     
      res.render('./headphones/indexV',
      {
         a10,
         a20,
         g435,
      });
   }
   catch
   {
      res.send('an error has ocurred');
   }
   
})

export {headphonesRouter}