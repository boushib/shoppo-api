import express from "express"
import { config as envConfig } from "dotenv"
import { productRouter, orderRouter } from "./routes/index.mjs"

envConfig()

const app = express()

app.use(express.json())

app.get("/api/v1", (_, res) => {
  res.json({ message: "Shoppo API v1" })
})

app.use("/api/v1", [productRouter, orderRouter])

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`)
})
