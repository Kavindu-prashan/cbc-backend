import express from 'express';
import { createProduct, deleteProudct, getProduct, getProductByName } from '../controllers/productController.js';

const productRouter = express.Router();

// Define routes
productRouter.get("/", getProduct); // GET to fetch products

productRouter.get("/:name", getProductByName);

productRouter.post("/", createProduct); // POST to create a product
productRouter.delete("/:name", deleteProudct); // DELETE to remove a product

export default productRouter;
