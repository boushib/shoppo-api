import { ObjectId } from "mongodb"
import { Mongo } from "../lib/mongo.mjs"

export const getProducts = async (_, res) => {
  try {
    const mongo = await Mongo.getDB("products")
    const products = await mongo.find().toArray()
    res.status(200).json({
      products: products.map((p) => ({ id: p._id, ...p, _id: undefined })),
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const mongo = await Mongo.getDB("products")
    const product = await mongo.findOne({ _id: new ObjectId(id) })

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    res.status(200).json({ id: product._id, ...product, _id: undefined })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}

export const addProduct = async (req, res) => {
  try {
    const { title, description, category, brand, image_url } = req.body
    const price = parseFloat(req.body.price)
    const quantity = parseFloat(req.body.quantity)
    const mongo = await Mongo.getDB("products")
    const now = new Date().toISOString()
    const created_at = now
    const updated_at = now
    const productData = {
      title,
      description,
      price,
      category,
      brand,
      image_url,
      quantity,
      created_at,
      updated_at,
    }
    const { insertedId: id } = await mongo.insertOne({ ...productData })
    res.status(201).json({ id, ...productData })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, category, brand, image_url } = req.body
    const price = parseFloat(req.body.price)
    const quantity = parseFloat(req.body.quantity)
    const updated_at = new Date().toISOString()
    const updates = {
      title,
      description,
      price,
      category,
      brand,
      image_url,
      quantity,
      updated_at,
    }

    Object.entries(updates).map(([k, v]) => {
      if (!v) delete updates[k]
    })

    const mongo = await Mongo.getDB("products")
    const product = await mongo.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updates } },
      { returnDocument: "after" },
    )
    res.status(200).json({ id: product._id, ...product, _id: undefined })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const mongo = await Mongo.getDB("products")
    await mongo.deleteOne({ _id: new ObjectId(id) })
    res.status(200).json({ message: "Product deleted" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Some error happened! Try again later." })
  }
}
