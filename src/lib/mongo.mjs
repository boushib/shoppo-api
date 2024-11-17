import { MongoClient } from "mongodb"
import { config as envConfig } from "dotenv"

envConfig()

export class Mongo {
  static instance
  static client

  constructor() {}

  static async getInstance() {
    if (!Mongo.instance) {
      const MONGO_URI = process.env.MONGO_URI
      const DB_NAME = new URL(MONGO_URI).pathname.split("/").pop()
      Mongo.client = await MongoClient.connect(MONGO_URI)
      Mongo.instance = Mongo.client.db(DB_NAME)
    }

    return Mongo.instance
  }

  static async getDB(collection) {
    const db = await Mongo.getInstance()
    return db.collection(collection)
  }

  static async close() {
    if (Mongo.client) {
      await this.client.close()
      Mongo.client = null
      Mongo.instance = null
      console.log("MongoDB connection closed.")
    }
  }
}
