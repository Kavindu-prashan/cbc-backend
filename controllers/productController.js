import Product from '../models/product/js'

import { isAdmin } from './userController.js'

if (isAdmin(req)) {
    res.json({
        message:"Please login as adminto add Product"
    })
    return
}



export function createProduct(req,res) {

    const newProductData = req.body

    const product = new Product(newProductData)

    


    product.save().then(
        ()=>{
            res.json({
                message:"Product Created"
            })
        }
        ).catch((error)=>{
            res.json({
                message:"Product not Created",
                message:error
            })
        }
        
        )
    
}
