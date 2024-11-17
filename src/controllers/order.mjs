import { ObjectId } from "mongodb"
import { Mongo } from "../lib/mongo.mjs"

export const getOrders = async (_, res) => {
  try {
    const mongo = await Mongo.getDB("orders")
    const orders = await mongo.find().toArray()
    res.status(200).json({
      orders: orders.map((p) => ({ id: p._id, ...p, _id: undefined })),
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params
    const mongo = await Mongo.getDB("orders")
    const order = await mongo.findOne({ _id: new ObjectId(id) })

    if (!order) {
      res.status(404).json({ message: "Order not found" })
      return
    }

    res.status(200).json({ id: order._id, ...order, _id: undefined })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}

export const addOrder = async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount)
    const products = req.body.products
    const mongo = await Mongo.getDB("orders")
    const created_at = new Date().toISOString()
    const orderData = {
      amount,
      products,
      created_at,
    }
    const { insertedId: id } = await mongo.insertOne({ ...orderData })
    res.status(201).json({ id, ...orderData })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}
