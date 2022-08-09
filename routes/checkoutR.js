import express from 'express';
import {Product} from '../models/productM.js';
import formatCurrency from '../public/javascript/util/formatCurrency.js';

const checkoutRouter = express.Router();

checkoutRouter.get('/',(req,res)=>
{
    res.render('./checkout/indexV');
});

checkoutRouter.post('/',async(req,res)=>
{
    let itemsBody = req.body.productData;
    if(typeof itemsBody!=='object')itemsBody=[itemsBody];

    const items = itemsBody.map(product=>JSON.parse(product));
    let products =[];

    await new Promise((res)=>
    {
        items.forEach( async(item)=>
        {
            const product = await Product.findById(item.id)
            
            products.push(
                {
                   name:product.name,
                   coverPath:product.coverPath,
                   price:product.price, 
                   priceFormatted:formatCurrency(product.price), 
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

    const grandTotal = formatCurrency(total + (Math.round((total*0.16 + Number.EPSILON)*100)/100) + 50);

    res.render('./checkout/confirmationV',
    {
        products,
        grandTotal
    })
})

export{checkoutRouter}