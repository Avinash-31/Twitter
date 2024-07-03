require('dotenv').config();

const { MongoClient } = require('mongodb');
const otpGenerator = require('otp-generator');
const nm = require('nodemailer');
const { ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, {
});

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    console.log('Connected to MongoDB');
  }
});

const userCollection = client.db('database').collection('users');
const postCollection = client.db('database').collection('posts');
const savedOTPS = {};

var transporter = nm.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});

exports.sendOTP = (req, res) => {
  let email = req.body.email;
  let digits = '0123456789';
  let limit = 4;
  let otp = '';
  for (let i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  var options = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: 'Email verification for app services',
    html: `<p>Enter the otp: ${otp} to verify your email address</p>`
  };

  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS[email];
      }, 60000);
      res.send('sent otp');
    }
  });
};

exports.verifyOTP = (req, res) => {
  let email = req.body.email;
  let otp = req.body.otp;

  if (!savedOTPS.hasOwnProperty(email)) {
    return res.send('Email not found');
  }

  if (!savedOTPS[email]) {
    return res.send('OTP expired');
  }
  console.log(`Received email: ${email}`);
  console.log(`Received OTP: ${otp}`);
  console.log(`Stored OTP: ${savedOTPS[email]}`);
  if (savedOTPS[email] === otp) {
    delete savedOTPS[email];
    res.send('Verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
};

exports.registerUser = async (req, res) => {
  const user = req.body;
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
      device: req.useragent.isDesktop ? 'Desktop' : req.useragent.isMobile ? 'Mobile' : 'Tablet',
      ip: req.clientIp,
      geo: req.geoip,
      loginTime: new Date(),
    };

    if (userInfo.browser === 'Chrome' && userInfo.device === 'Mobile') {
      user.isBrowserVerified = false;
    }

    user.userInfo = userInfo;
    const result = await userCollection.insertOne(user);
    res.send(result);
  }
};

exports.checkTimeAndDevice = (req, res) => {
  const currTime = new Date();
  const start = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 9);
  const end = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate(), 21);

  const device = req.useragent.isDesktop ? 'Desktop' : req.useragent.isMobile ? 'Mobile' : 'Tablet';

  if (device === 'Mobile') {
    if (currTime >= start && currTime <= end) {
      res.send('Access granted');
    } else {
      res.send('Access denied');
    }
  } else {
    res.send('Access granted');
  }
  res.send('Access granted');
};

exports.getLoggedInUser = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await userCollection.find({ email: email }).toArray();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "An error occurred while fetching the user.", error: error });
  }
};

exports.getUserInfo = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Update the userInfo
    const userInfo = {
      browser: req.useragent.browser,
      os: req.useragent.os,
      device: req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet",
      ip: req.clientIp,
      geo: req.geoip,
      loginTime: new Date(),
    };
    user.userInfo = userInfo;
    // Conditional isBrowserVerified update
    user.isBrowserVerified = !(userInfo.browser === "Chrome" || userInfo.device === 'Mobile' || userInfo.os === 'Linux');
    // Update the user in the database
    const result = await userCollection.updateOne({ email }, { $set: user });
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "An error occurred while fetching the user info.", error: error });
  }
};

exports.getUserStatus = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Calculate total likes and upvotes from posts
    const posts = await postCollection.find({ email: email }).toArray();
    let totLikes = 0, totUpvotes = 0;
    posts.forEach(post => {
      totLikes += post.likes;
      totUpvotes += post.upvotes;
    });
    // Calculate points
    let pts = 0;
    if (totLikes / 10000 > 0) {
      pts += Math.floor(totLikes / 10000) * 10;
    }
    if (totUpvotes / 10000 > 0) {
      pts += Math.floor(totUpvotes / 10000) * 50;
    }
    pts -= user.toDeduct;
    // Update user data
    await userCollection.updateOne(
      { email: email },
      { $set: { totalLikes: totLikes, totalUpvotes: totUpvotes, points: pts } }
    );
    res.json({
      postCount: user.postCount,
      isSubscribed: user.isSubscribed,
      subscriptionExpiry: user.subscriptionExpiry,
      totalLikes: totLikes,
      totalUpvotes: totUpvotes,
      isMisusing: user.isMisusing,
      points: pts,
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred while fetching the user status.", error: error });
  }
};

exports.getUserStat = async (req, res) => {
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
  });
};