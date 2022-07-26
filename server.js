import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
/* import path from "path";
import {URL} from "url"; */
import expressLayouts from "express-ejs-layouts";
import {indexRouter} from "./routes/indexR.js";
import {earphonesRouter} from "./routes/earphonesR.js";
import {headphonesRouter} from "./routes/headphonesR.js";
import {speakersRouter} from "./routes/speakersR.js";
import {productsRouter} from "./routes/productsR.js";
import {brandsRouter} from "./routes/brandsR.js";

if(process.env.NODE_ENV !== 'production')
{
   dotenv.config();
}

const app = express();

app.set('view engine','ejs');
app.set('views', './views');
app.set('layout','./layouts/layout');

app.use(expressLayouts);
/* app.use(express.static('public')); */
app.use(express.static('./'));
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',err=>console.log(`mongodb | an error occureed: ${err}`));
db.once('open',()=>console.log(`mongodb | successfully connected`));

app.use('/',indexRouter);
app.use('/earphones',earphonesRouter);
app.use('/headphones',headphonesRouter);
app.use('/speakers',speakersRouter);
app.use('/products',productsRouter);
app.use('/brands',brandsRouter);


app.listen(process.env.PORT || 3000);



