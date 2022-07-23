import express from "express";
const earphonesRouter = express.Router();

earphonesRouter.get('/',(req,res)=>
{
    res.render('./earphones/indexV');
})

export{earphonesRouter}