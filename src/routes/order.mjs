import { Router } from "express"
import { addOrder, getOrder, getOrders } from "../controllers/order.mjs"

export const orderRouter = Router()
orderRouter.route("/orders").get(getOrders).post(addOrder)
orderRouter.route("/orders/:id").get(getOrder)
