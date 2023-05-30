const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_DB_KEY);

router.get("/", async (req, res) => {
  try {
    await client.connect();

    const database = client.db("mydatabase");
    const shopsCollection = database.collection("shops");

    const shops = await shopsCollection.find().toArray();

    res.json(shops);
  } catch (error) {
    console.error("Error retrieving shops:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  } finally {
    await client.close();
  }
});

module.exports = router;
