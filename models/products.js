import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const Product = mongoose.model("products",ProductsSchema)
export default Product