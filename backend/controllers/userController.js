const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL, {});
const userCollection = client.db("database").collection("users");
const postCollection = client.db("database").collection("posts");

exports.getUsers = async (req, res) => {
  const user = await userCollection.find().toArray();
  res.json(user);
};

exports.getUser = async (req, res) => {
  const email = req.query.email;
  const user = await userCollection.find({ email: email }).toArray();
  res.send(user);
};

exports.getUserPosts = async (req, res) => {
  const email = req.query.email;
  const posts = (
    await postCollection.find({ email: email }).toArray()
  ).reverse();
  res.send(posts);
};

exports.getUserStatus = async (req, res) => {
  const email = req.query.email;
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const { postCount, isSubscribed, subscriptionExpiry, totalLikes, totalUpvotes, isMisusing, points } = user;

  const posts = await postCollection
    .find({ email: email })
    .toArray();
  let totLikes = 0;
  let totUpvotes = 0;
  posts.forEach((post) => {
    totLikes += post.likes;
    totUpvotes += post.upvotes;
  });
  let pts = 0;
  if (totLikes / 10000 > 0) {
    pts += Math.floor(totLikes / 10000) * 10;
  }
  if (totUpvotes / 10000 > 0) {
    pts += Math.floor(totUpvotes / 10000) * 50;
  }
  pts = pts - user.toDeduct;

  await userCollection.updateOne(
    { email: email },
    {
      $set: {
        totalLikes: totLikes,
        totalUpvotes: totUpvotes,
        points: pts,
      }
    }
  );

  const updatedUser = await userCollection.findOne({ email: email });

  res.send({
    postCount: updatedUser.postCount,
    isSubscribed: updatedUser.isSubscribed,
    subscriptionExpiry: updatedUser.subscriptionExpiry,
    totalLikes: updatedUser.totalLikes,
    totalUpvotes: updatedUser.totalUpvotes,
    points: updatedUser.points,
    isMisusing: updatedUser.isMisusing,
  });
};

exports.updateUserStatus = async (req, res) => {
  const email = req.body.email;
  const toDeduct = req.body.toDeduct;
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  await userCollection.updateOne(
    { email: email },
    {
      $set: {
        toDeduct: toDeduct,
      },
    }
  );

  const updatedUser = await userCollection.findOne({ email: email });

  res.send(updatedUser);
};

exports.updateUserByEmail = async (req, res) => {
  const filter = { email: req.params.email };
  const profile = req.body;
  const options = { upsert: true };
  const updateDoc = { $set: profile };
  const result = await userCollection.updateOne(filter, updateDoc, options);
  res.send(result);
};