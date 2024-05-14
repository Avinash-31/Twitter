const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

const app = express();
const port = 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db("database").collection("posts");
    const userCollection = client.db("database").collection("users");

    app.get("/posts", async (req, res) => {
      const posts = (await postCollection.find().toArray()).reverse();
      res.json(posts);
    });

    app.get("/users", async (req, res) => {
      const user = await userCollection.find().toArray();
      res.json(user);
    });

    app.get("/loggedInUser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.get("/userPosts", async (req, res) => {
      const email = req.query.email;
      const posts = (
        await postCollection.find({ email: email }).toArray()
      ).reverse();
      res.send(posts);
    });

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/userUpdates/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
