import express from "express";
import {Product} from "../models/productM.js";
const earphonesRouter = express.Router();

earphonesRouter.get('/',async(req,res)=>
{
    try
    {
        const g333 = await Product.findOne({name:'G333'});
        const vista2 = await Product.findOne({name:'VISTA 2'});
        const tarah = await Product.findOne({name:'TARAH'});
    
        res.render('./earphones/indexV',
        {
            g333,
            vista2,
            tarah
        });
    }
    catch
    {
       res.send('something wrong was happend')
    }
})

export{earphonesRouter}