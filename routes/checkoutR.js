import express from 'express';
import {Product} from '../models/productM.js';

const checkoutRouter = express.Router();

checkoutRouter.get('/',(req,res)=>
{
    
    res.render('./checkout/indexV');
});

checkoutRouter.post('/',async(req,res)=>
{
    const itemsBody = req.body.productData;
    const items = itemsBody.map(product=>JSON.parse(product));
    let products =[];

    await new Promise((res)=>
    {
        items.forEach( async(item,pos)=>
        {
            const product = await Product.findById(item.id)
            
            products.push(
                {
                   name:product.name,
                   coverPath:product.coverPath,
                   price:product.price, 
                   quantity:item.quantity
                });
            if(products.length===items.length)
            {
                res();
            }
        });
    })
    
    const totalsPrice = products.map(entry => entry.price*entry.quantity);

    const total = totalsPrice.reduce((tot,num)=>
    {
        return tot+num
    },0);

    const grandTotal = total + (Math.round((total*0.16 + Number.EPSILON)*100)/100) + 50;

    res.render('./checkout/confirmationV',
    {
        products,
        grandTotal
    })
})

export{checkoutRouter}