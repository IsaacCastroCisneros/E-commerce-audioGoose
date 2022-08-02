import { render } from "ejs";
import express from "express";
import {Brand} from "../models/brandsM.js";
const brandsRouter = express.Router();

brandsRouter.get('/', async(req,res)=>
{
    /* const brands = await Brand.find(); */
    let brands= {}
    if(req.query.brand !==null && req.query.brand !=='')
    {
        brands.name = new RegExp(req.query.brand,'i');
    }
    try
    {
        const brandsFound = await Brand.find(brands);
        res.render('./brands/indexV',
        {
            brands: brandsFound
        })
    }
    catch
    {

    }
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