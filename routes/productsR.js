import express from "express";
import {Product} from "../models/productM.js";
import {Brand } from "../models/brandsM.js";

const mimeTypes = ['image/jpeg','image/png','image/gif'];

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
});

productsRouter.get('/new',async(req,res)=>
{
    renderNewPage(res,new Product());
});

productsRouter.post('/',async(req,res)=>
{

    const product = new Product(
        {
            name:req.body.name,
            price:req.body.price,
            preview:req.body.preview,
            description:req.body.description,
            date:new Date(req.body.date),
            quantity:req.body.quantity,
            brand:req.body.brand,
            type:req.body.type,
        }
    )
    saveCover(product,req.body.cover,'coverImage');
    saveCover(product,req.body.image,'image');
    saveCover(product,req.body.image1,'image1');
    saveCover(product,req.body.image2,'image2');

    try
    {
        const newProduct = await product.save();
        res.redirect('./products');
    }
    catch(err)
    {
       
        renderNewPage(res,product,true)
    }
})

function saveCover(product,file,propertie)
{
    if(file===null)return
    const img = JSON.parse(file);

    if(img!==null && mimeTypes.includes(img.type))
    {
        const buffer = newBuffer(img);

        switch(propertie)
        {
            case 'coverImage':
            {
                product.coverImage = buffer.buffer;
                product.coverImageType = buffer.type;
            }
            break;
            case 'image':
            {
                product.image = buffer.buffer;
                product.imageType = buffer.type;
            }
            break;
            case 'image1':
            {
                product.image1 = buffer.buffer;
                product.imageType1 = buffer.type;
            }
            break;
            case 'image2':
            {
                product.image2 = buffer.buffer;
                product.imageType2 = buffer.type;
            }
        }
    }
}
function newBuffer(img)
{
    return {
        buffer:new Buffer.from(img.data,'base64'),
        type:img.type
    }
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

