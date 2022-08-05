import express from "express";
import {Product} from "../models/productM.js";
const speakersRouter = express.Router();

speakersRouter.get('/',async(req,res)=>
{
    try
    {
        const g560 = await Product.findOne({name:'G560'});
        const z211 = await Product.findOne({name:'Z211'});
        const z407 = await Product.findOne({name:'Z407'});
    
        res.render('./speakers/indexV',
        {
            g560,
            z211,
            z407
        });
    }
    catch
    {
       res.send('something wrong was happend')
    }
    
});

speakersRouter.get('/:id',async(req,res)=>
{
    try
    {
        const product = await Product.findById(req.params.id);
        const Brand = await Product.findById(product.brand);

        /* res.render('./hea') */
        
    }
    catch
    {

    }
});
export{speakersRouter}