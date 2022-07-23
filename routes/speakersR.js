import express from "express";
const speakersRouter = express.Router();

speakersRouter.get('/',(req,res)=>
{
    res.render('./speakers/indexV');
})

export{speakersRouter}