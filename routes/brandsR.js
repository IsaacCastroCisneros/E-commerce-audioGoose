import { render } from "ejs";
import express from "express";
import {Brand} from "../models/brandsM.js";
const brandsRouter = express.Router();

brandsRouter.get('/', async(req,res)=>
{
    const brands = await Brand.find();
    res.render('./brands/indexV',
    {
        brands: brands
    })
});

brandsRouter.get('/new', (req,res)=>
{
    res.render('./brands/newV')
});

brandsRouter.post('/', async(req,res)=>
{
    const brand = new Brand(
        {
            name:req.body.name
        }
    );

    try
    {
        const newBrand = await brand.save();  
        res.redirect('./brands');    
    }
    catch(err)
    {
        console.log(err);
        res.render('./brands/newV');
    }
});

export {brandsRouter};