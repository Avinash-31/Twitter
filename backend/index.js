const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
const useragent = require('express-useragent');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');
const otpGenerator = require('otp-generator');

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

//paymnet route handling
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_SIGNING_ACC);
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
      const userCollection = client.db("database").collection("users");
      const user = await userCollection.findOne({ email: session.customer_details.email });
      if (user) {
        await userCollection.updateOne(
          {
            email: session.customer_details.email
          },
          {
            $set: { isSubscribed: true }
          }
        );
      }
      console.log(session);
      let emailto = session.customer_details.email
      pLink = session.payment_link;
      subscriptionNumber = 0;
      // Update user's subscription status
      if (pLink == process.env.YEARLY_SUBSCRIPTION_LINK) {
        // yearly subscription
        subscriptionNumber = 2;
        await userCollection.updateOne(
          { email: emailto },
          { $set: { isSubscribed: 2 } }
        );
        // set subscription expiry to 1 year from present date
        await userCollection.updateOne(
          { email: emailto },
          { $set: { subscriptionExpiry: Date.now() + 31536000000 } }
        );
      }
      else if (pLink == process.env.MONTHLY_SUBSCRIPTION_LINK) {
        // monthly subsscription
        subscriptionNumber = 1
        await userCollection.updateOne(
          { email: emailto },
          { $set: { isSubscribed: 2 } }
        );
        // set subscription expiry to 1 month from present date
        await userCollection.updateOne(
          { email: emailto },
          { $set: { subscriptionExpiry: Date.now() + 2592000000 } }
        );
      }

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

      subscriptionType = subscriptionNumber == 2 ? "Yearly" : "Monthly";
      amountPaid = subscriptionNumber == 2 ? "Rs 499" : "Rs 199";
      // send mail with defined transporter object
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: emailto, // list of receivers
        subject: "Payment Successful", // Subject line
        text: "Payment Successful", // plain text body
        html: `
        <div class="container mt-6 mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-12 col-xl-7">
              <div class="card">
                <div class="card-body p-5">
                  <h2>
                    Hey ${session.customer_details.name},
                  </h2>
                  <p class="fs-sm">
                    This is the receipt for a payment of <strong>${amountPaid}</strong> (Rupee) you made to Twitter Subscription.
                  </p>

                  <div class="border-top border-gray-200 pt-4 mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="text-muted mb-2">Payment No.</div>
                        <strong>#${session.subscription}</strong>
                      </div>
                      <div class="col-md-6 text-md-end">
                        <div class="text-muted mb-2">Payment Date</div>
                        <strong>${Date.now}</strong>
                      </div>
                    </div>
                  </div>

                  <div class="border-top border-gray-200 mt-4 py-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="text-muted mb-2">Client</div>
                        <strong>
                          ${session.customer_details.name}
                        </strong>
                        <p class="fs-sm">
                          
                          <br>
                          <a href="#!" class="text-purple">${session.customer_details.email}
                          </a>
                        </p>
                      </div>
                      <div class="col-md-6 text-md-end">
                        <div class="text-muted mb-2">Payment To</div>
                        <strong>
                          Twitter ${subscriptionType} Subscription
                        </strong>
                        <p class="fs-sm">
                          NIT Durgapur
                          <br>
                          <a href="#!" class="text-purple">avinash.80031@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <table class="table border-bottom border-gray-200 mt-3">
                    <thead>
                      <tr>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-0">${subscriptionType} Subscription</td>
                        <td class="text-end px-0">${amountPaid}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="mt-5">
                    <div class="d-flex justify-content-end">
                      <p class="text-muted me-3">Subtotal:</p>
                      <span>${amountPaid}</span>
                    </div>
                    <div class="d-flex justify-content-end">
                      
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                      <h5 class="me-3">Total:</h5>
                      <h5 class="text-success">${amountPaid}</h5>
                    </div>
                  </div>
                </div>
                <a href="#!" class="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
                  <span class="svg-icon text-white me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-g</title><path d="M336,208V113a80,80,0,0,0-160,0v95" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><rect x="96" y="208" width="320" height="272" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></rect></svg>
                  </span>
                  Payment Status : ${session.payment_status}
                </a>
              </div>
            </div>
          </div>
        </div>
        `, // html body
      });
      console.log("Message sent ");

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

//useragent and requrestIp
app.use(useragent.express());
app.use(requestIp.mw());


// geoip
app.use((req, res, next) => {
  const ip = req.clientIp;
  const geo = geoip.lookup(ip);
  req.geoip = geo;
  next();
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

    app.get("/", (req, res) => {
      // userInfo
      const userInfo =
      {
        browser: req.useragent.browser,
        os: req.useragent.os,
        device: req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet",
        ip: req.clientIp,
        geo: req.geoip,
        loginTime: new Date(),
      }
      console.log(userInfo);
      res.send(userInfo);
    });

    app.get("/time", async (req, res) => {
      const currTime = new Date();
      //set minutes as well
      // start and end should be exactly 9:00 Am and 3:00PM
      const start = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 9
      );
      const end = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 21
      );
      // get device type
      const device = req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet";
      if (device === "Mobile") {
        if (currTime >= start && currTime <= end) {
          res.send("Access granted");
        }
        else {
          res.send("Access denied");
        }
      }
      else{
        res.send("Access granted");
      }
    })

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

    app.get("/userStatus", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.findOne({ email: email });
      // const posts = await postCollection.find({ email: email }).toArray();
      if (!user) {
        return res.status(404).send("User not found")
      }
      const { postCount, isSubscribed, subscriptionExpiry, totalLikes, totalUpvotes, isMisusing, points } = user;
      // update total likes and upvotes of all posts
      const posts = await postCollection
        .find({ email: email })
        .toArray();
      let totLikes = 0;
      let totUpvotes = 0;
      posts.forEach((post) => {
        totLikes += post.likes;
        totUpvotes += post.upvotes;
      });
      pts = 0;
      if (totLikes / 10000 > 0) {
        pts += Math.floor(totLikes / 10000) * 10;
      }
      if (totUpvotes / 10000 > 0) {
        pts += Math.floor(totUpvotes / 10000) * 50;
      }
      pts = pts - user.toDeduct;
      // console.log(pts);
      // update the user data
      await userCollection.updateOne(
        { email: email },
        { $set: { totalLikes: totLikes, totalUpvotes: totUpvotes, points: pts } }
      );

      res.json({
        postCount,
        isSubscribed,
        subscriptionExpiry,
        totalLikes,
        totalUpvotes,
        isMisusing,
        points,
      })
    })



    const { ObjectId } = require('mongodb');

    app.get("/userStat", async (req, res) => {
      const postId = req.query.postid;
      const post = await postCollection.findOne({ _id: new ObjectId(postId) });
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const { email } = post;
      const user = await userCollection.findOne({ email: email });

      if (!user) {
        return res.status(404).send("User not found");
      }
      const { postCount, isSubscribed, subscriptionExpiry, totalLikes, totalUpvotes, isMisusing, points } = user;
      res.json({
        postCount,
        isSubscribed,
        subscriptionExpiry,
        totalLikes,
        totalUpvotes,
        isMisusing,
        points,
      })
    })

    // to get user login details and isBrowserVerified
    app.get("/userInfo", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection
        .findOne
        (
          {
            email: email
          }
        );
      if (!user) {
        return res.status(404).send("User not found");
      }
      // update the userInfo 
      const userInfo = {
        browser: req.useragent.browser,
        os: req.useragent.os,
        device: req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet",
        ip: req.clientIp,
        geo: req.geoip,
        loginTime: new Date(),
      }
      // update the user
      user.userInfo = userInfo;
      //update the database
      // if browser is chrome and device is mobile set isBrowserVerified to false
      if (userInfo.browser === "Chrome" || userInfo.device === 'Mobile' || userInfo.os === 'Linux') {
        user.isBrowserVerified = false;
      }
      else {
        user.isBrowserVerified = true;
      }
      // user.isBrowserVerified = false;
      const result = await userCollection.updateOne(
        {
          email
        },
        { $set: user }
      );
      console.log(user);
      res.json(user);
    });

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const user = await userCollection.findOne({ email: post.email });
      // to get the number of posts of the user form postCollection
      const posts = await postCollection.find({ email: post.email }).toArray();
      // console.log(posts.length)
      // Increment the user's post count
      await userCollection.updateOne(
        { email: post.email },
        { $set: { postCount: posts.length + 1 } }
      );
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

    // update isBrowserVerified route
    app.patch("/user/:email", async (req, res) => {
      const { email } = req.params;
      const user = await userCollection
        .findOne
        (
          {
            email: email
          }
        );
      if (!user) {
        return res.status(404).send("User not found");
      }
      // update the userInfo
      const userInfo = {
        browser: req.useragent.browser,
        os: req.useragent.os,
        device: req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet",
        ip: req.clientIp,
        geo: req.geoip,
        loginTime: new Date(),
      }
      // if browser is chrome and device is mobile set isBrowserVerified to false
      if (userInfo.browser === 'Chrome' && userInfo.device === 'Mobile') {
        user.isBrowserVerified = false;
      }
      else {
        user.isBrowserVerified = true;
      }
      // useInfo to user
      user.userInfo = userInfo;
      const result = await userCollection.updateOne(
        {
          email
        },
        { $set: user }
      );
      res.send(result);
    });

    app.patch("/convert", async (req, res) => {
      const { email, pts } = req.query;
      const user = await userCollection.findOne({ email: email });
      if (!user) {
        return res.status(404).send("User not found");
      }
      // console.log(pts);
      toDeductPts = parseInt(user.toDeduct) + parseInt(pts);
      console.log(toDeductPts);
      const updatedUser = await userCollection.updateOne(
        { email: email },
        { $set: { toDeduct: toDeductPts, isSubscribed: pts == 200 ? 1 : 2, subscriptionExpiry: Date.now() + 31536000000 } }
      );
      // console.log(user.toDeduct);
      // console.log("Updated user : ",updatedUser);
      res.json(updatedUser);
    });



    app.patch("/posts/:id/deupvote", async (req, res) => {
      const { id } = req.params;
      const post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const updatedPost = await postCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { upvotes: post.upvotes - 1 } }
      );
      res.send(updatedPost);
    });

    //to patch likes
    app.patch("/posts/:id/like", async (req, res) => {
      const { id } = req.params;
      const post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const updatedPost = await postCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { likes: post.likes + 1 } }
      );
      res.send(updatedPost);
    });

    app.patch("/posts/:id/dislike", async (req, res) => {
      const { id } = req.params;
      const post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const updatedPost = await postCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { likes: post.likes - 1 } }
      );
      res.send(updatedPost);
    });

    app.post("/register", async (req, res) => {
      const user = req.body;
      // if exists in database then dont register
      const userExists = await userCollection.findOne({ email: user.email });
      if (!userExists) {
        user.isSubscribed = 0;
        user.postCount = 0;
        user.points = 0;
        user.totalLikes = 0;
        user.totalUpvotes = 0;
        user.subscriptionExpiry = Date.now();
        user.isMisusing = false;
        user.toDeduct = 0;
        user.isBrowserVerified = true;

        console.log(req.useragent);
        const userInfo = {
          browser: req.useragent.browser,
          os: req.useragent.os,
          device: req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet",
          ip: req.clientIp,
          geo: req.geoip,
          loginTime: new Date(),

        }
        // if browser is chrome and device is mobile set isBrowserVerified to false
        if (userInfo.browser === 'Chrome' && userInfo.device === 'Mobile') {
          user.isBrowserVerified = false;
        }
        // useInfo to user
        user.userInfo = userInfo;
        const result = await userCollection.insertOne(user);
        res.send(result);
      }

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
        return res.send("Email not found");
      }

      if (!savedOTPS[email]) {
        return res.send("OTP expired");
      }
      console.log(`Received email: ${email}`);
      console.log(`Received OTP: ${otp}`);
      console.log(`Stored OTP: ${savedOTPS[email]}`);
      if (savedOTPS[email] === otp) {
        delete savedOTPS[email];
        res.send("Verified");
      } else {
        res.status(400).send("Invalid OTP");
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
