import mongoose from 'mongoose';
const brandsSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        }
    }
);

const Brand = mongoose.model('Brand', brandsSchema);

export {Brand}

