import Product  from "../models/product.js";

import { isAdmin } from "./userController.js";




export function createProduct(req,res){

  if(!isAdmin(req)){
    res.json({
      message: "Please login as administrator to add products"
    })
    return
  }

  const newProductData = req.body

  const product = new Product(newProductData)

  product.save().then(()=>{
    res.json({
      message: "Product created"
    })
  }).catch((error)=>{
    res.json({
      message: error
    })
  })
}

export function getProducts(req,res){
  console.log(res);
  Product.find().then((products)=>{
    res.json(products)
  })
}


export function deleteProduct(req,res) {
  if(!isAdmin(req)){
    res.status(403).json({
      message:"Please login as admin to delete prodcts"
    })
    return
  }
  const productId = req.params.productId

  Productroduct.deleteOne(
    {productId:productId}
  
  ).then(()=>{
    res.json({
      message:"Product Deleted"
    })
  }).catch((error)=>{
    res.status(403).json({
      message:error
    })
  })

}