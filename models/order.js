import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({

    orderId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        
    },
    orderedItems:[
        {

            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantuity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },

            
        }
    ],date:{
        type:Date,
        default:Date.now
    },
    paymentId:{
        type:String
    },
    status:{
        type:String,
        default:"preparing"
    },
    notes:{
        type:String,

    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const Order = mongoose.model("Orders",orderSchema);
export default Order