const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
const app = express();
app.use(cors('*'));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var nm = require('nodemailer');
const endpointSecret = process.env.STRIPE_SIGNING_ACC;
let savedOTPS = {

};

const port = 5000;
dotenv.config();

app.use(cors());
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  console.log("Hello");
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log("Hello World");
  console.log(event.type);
  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      session = event.data.object;
      console.log(session);
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.completed':
      session = event.data.object;
      console.log(session);
      let emailto = session.customer_details.email

      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      let transporter = nm.createTransport(
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

      // send mail with defined transporter object
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: emailto, // list of receivers
        subject: "Payment Successful", // Subject line
        text: "Payment Successful", // plain text body
        html: `
        
        <h1>Payment Successful</h1>
        <p>Thank you ${session.customer_details.name} for your payment</p>
        <p>Amount: Rs 500</p>
        <p>Payment Status: ${session.payment_status}</p>
        <p>Payment Date: ${Date.now}</p>
        <p>Payment Method: ${session.payment_method_types}</p>



        `, // html body
      });
      console.log("Message sent : %s", info.message);

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {});
const paymentRoute = require('./routes/paymentRoute');
app.use('/payment', paymentRoute);
async function run() {
  try {
    console.log("Hello from server");
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
