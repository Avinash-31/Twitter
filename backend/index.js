const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
const app = express();
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var nm = require('nodemailer');
let savedOTPS = {

};

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

    app.patch("/posts/:id/upvote", async (req, res) => {
      const { id } = req.params;
      const post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const updatedPost = await postCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { upvotes: post.upvotes + 1 } }
      );
      res.send(updatedPost);
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

    var transporter = nm.createTransport(
      {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        }
      }
    );

    app.post('/sendotp', (req, res) => {
      let email = req.body.email;
      let digits = '0123456789';
      let limit = 4;
      let otp = ''
      for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      var options = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Testing node emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`
      };

      transporter.sendMail(
        options, function (error, info) {
          if (error) {
            console.log(error);
            res.status(500).send("couldn't send")
          }
          else {
            savedOTPS[email] = otp;
            setTimeout(
              () => {
                delete savedOTPS.email
              }, 60000
            )
            res.send("sent otp")
          }

        }
      )
    })

    app.post('/verify', (req, res) => {
      let email = req.body.email;
      let otp = req.body.otp;

      if (!savedOTPS.hasOwnProperty(email)) {
        return res.status(400).send("Email not found");
      }

      if (!savedOTPS[email]) {
        return res.status(400).send("OTP expired");
      }
      console.log(`Received email: ${email}`);
      console.log(`Received OTP: ${otp}`);
      console.log(`Stored OTP: ${savedOTPS[email]}`);
      if (savedOTPS[email] == otp) {
        delete savedOTPS[email];
        res.send("Verified");
      } else {
        res.status(500).send("Invalid OTP");
      }
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
