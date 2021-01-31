const router = require("express").Router();

const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Joi = require("joi");
const { findById } = require("../../models/Post");

const schema = Joi.object({
  text: Joi.string()
    .required()
    .messages({ "any.required": "Please enter text" }),
}).options({ allowUnknown: true });

router.post("/", auth, async (req, res) => {
  // Validation
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //find user who posts
    const user = await User.findById(req.user.id).select("-password");

    // Creating new post
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    });
    // Save to database
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get all posts from database from all users
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get single post by his id
router.get("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    // If there is wrong ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Deleting user's post by post's id
router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if user posted this post, so user can delete it
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Action is forbiden!",
      });
    }

    await post.remove();
    res.json({ message: "Post Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Like a users post, user can only like once each post
router.put("/like/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ message: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    // If there is wrong ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Unlike post if we already liked it
router.put("/unlike/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ message: "Post has not yet been liked" });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    // If there is wrong ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// User can comment on everypost in database, even posts made by himself, same as likes
router.post("/comment/:postId", auth, async (req, res) => {
  // Validation
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.postId);

    const newComm = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    };
    // Saving comments to comments array in post, and saving post in database
    post.comments.unshift(newComm);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    // If there is wrong ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete comment, only user whos commented can delete it
router.delete("/comment/:postId/:commentId", auth, async (req, res) => {
  try {
    // First find post, and then find comment
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.commentId
    );
    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        message: "Comment does not exists",
      });
    }

    // Check if user posted this comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Action forbiden!",
      });
    }

    post.comments = post.comments.filter(
      (comm) => comm.id !== req.params.commentId
    );
    await post.save();
    return res.json(post.comments);
  } catch (error) {
    // If there is wrong ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
