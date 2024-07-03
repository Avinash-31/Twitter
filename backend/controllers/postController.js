const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL, {});
const postCollection = client.db("database").collection("posts");

exports.getAllPosts = async (req, res) => {
  const posts = (await postCollection.find().toArray()).reverse();
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = req.body;
  const userCollection = client.db("database").collection("users");
  const user = await userCollection.findOne({ email: post.email });
  const posts = await postCollection.find({ email: post.email }).toArray();

  await userCollection.updateOne(
    { email: post.email },
    { $set: { postCount: posts.length + 1 } }
  );

  const result = await postCollection.insertOne(post);
  res.send(result);
};

exports.upvotePost = async (req, res) => {
  const { id } = req.params;
  const post = await postCollection.findOne({ _id: new ObjectId(id) });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const updatedPost = await postCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { upvotes: post.upvotes + 1 } }
  );
  res.send(updatedPost);
};

exports.deupvotePost = async (req, res) => {
  const { id } = req.params;
  const post = await postCollection.findOne({ _id: new ObjectId(id) });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const updatedPost = await postCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { upvotes: post.upvotes - 1 } }
  );
  res.send(updatedPost);
};

exports.likePost = async (req, res) => {
  const { id } = req.params;
  const post = await postCollection.findOne({ _id: new ObjectId(id) });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const updatedPost = await postCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { likes: post.likes + 1 } }
  );
  res.send(updatedPost);
};

exports.dislikePost = async (req, res) => {
  const { id } = req.params;
  const post = await postCollection.findOne({ _id: new ObjectId(id) });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const updatedPost = await postCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { likes: post.likes - 1 } }
  );
  res.send(updatedPost);
};
