import express from 'express';
import {Product} from "../models/productM.js";
import {Brand } from "../models/brandsM.js";

const searchRouter = express.Router();

searchRouter.get('/',async(req,res)=>
{
    const productOptions={};

    if(req.query.name!==null && req.query.name!==undefined)
    {
        productOptions.name = new RegExp(req.query.name,'i');
    }
    if(req.query.type!==null && req.query.type!==undefined && req.query.type!=='any')
    {
        productOptions.type = new RegExp(req.query.type,'i');
    }
    if(req.query.brand!==null && req.query.brand!==undefined && req.query.brand!=='any')
    {
        productOptions.brand = req.query.brand;
    }

    try
    {
        const brands = await Brand.find();
        const products = await Product.find(productOptions);

        if(products.length>0)
        {
            await new Promise((res,rej)=>
            {
                products.forEach(async (product,pos)=>
                    {
                        const brand = await Brand.findById(product.brand);
                        const brandName = brand.name;
                        product.brandName = brandName;
                        
                        if(Number(pos)===Number(products.length - 1))
                        {
                            res();
                        }
                    });
            });
        }

        res.render('./search/searchV',
        {
            brands,
            products,
        });
    }
    catch
    {
        res.redirect('/search');
    }
})

export{searchRouter};