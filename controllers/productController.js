import Product from "../models/products.js";


export function getProduct(req, res) {
    Product.find()
        .then((productList) => {
            res.status(200).json({
                list: productList,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Products not found",
                error: error.message,
            });
        });
}


export function createProduct(req, res) {

    console.log(req.user)

    if(req.user == null){
        res.json({
            message:"You are not logged in"
        })
        return
    }
    if(req.user.type!="admin"){
        res.json({
            message:"You are not an admin"
        })
        return
    }

    const newProduct = new Product(req.body); 

    newProduct.save()
        .then(() => {
            res.status(201).json({
                message: "Product saved successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Product save failed",
                error: error.message,
            });
        });
}

export function deleteProudct(req, res) {
    Product.deleteOne({ name: req.params.name }) 
        .then(() => {
            res.status(200).json({
                message: "Product deleted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Product deletion failed",
                error: error.message,
            });
        });
}


export function getProductByName(req,res){

    const name = req.params.name

    Product.find({ name: name}).then(
        (productList)=>{

            if(productList.length == 0){
                res.json({
                    message:"Product not found"
                })
            }else{
                res.json({
                    list:productList
                })
            }

        }

    ).catch(

        ()=>{

            res.json({

                message:"Error"
            })

        }
    )
}