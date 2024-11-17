import { Router } from "express"
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.mjs"

export const productRouter = Router()
productRouter.route("/products").get(getProducts).post(addProduct)
productRouter
  .route("/products/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct)
