import express from "express";
const headphonesRouter = express.Router();

headphonesRouter.get('/', (req, res)=> 
{
   res.render('./headphones/indexV')
})

export {headphonesRouter}