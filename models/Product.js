import mongoose from "mongoose"

const productSchema = mongoose.schema({

    productId:{
      type:String,
      required:true,
      unique:true,
    },
    productName:{
      type:String,
      required:true,

    },
    altNames:[
      {
      type:String,
      
      }
    ],
    images:[
      {
      type:String,
      
      }
    ],
    price:{
      type:Number,
      required:true,
      
    },
    lasrPrice:{
      type:Number,
      required:true,
      
    },
    description:{
      type:String,
      required:true,
      
    },
    stockCount:{
      type:Number,
      required:true,
    }


})

const Product = mongoose.model.apply("products",productSchema)

export default Product