const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_DB_KEY);

router.post("/", async (req, res) => {
  try {
    await client.connect();

    const database = client.db("mydatabase");
    const ordersCollection = database.collection("orders");

    const newOrder = req.body;

    const result = await ordersCollection.insertOne(newOrder);

    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  } finally {
    await client.close();
  }
});

module.exports = router;
