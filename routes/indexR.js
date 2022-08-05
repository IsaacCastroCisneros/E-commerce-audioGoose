import express from "express";
const indexRouter = express.Router();

indexRouter.get('/',async(req,res)=>
{
    res.render('./indexV');
})

indexRouter.post('/',async(req,res)=>
{
    res.redirect(`/search?name=${req.body.search}`);
})

export {indexRouter}