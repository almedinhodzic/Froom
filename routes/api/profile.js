const router = require("express").Router();
const Joi = require("joi");

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// Get current profile of logged in user, if there is no user, send bad request with message
// This will help on user's dashboard on frontend

router.get("/me", auth, async (req, res) => {
  try {
    // Check if there is profile for logged user
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    // If there is no user, send response with bad request 400, profile for this user does not exist.
    if (!profile) {
      return res.status(400).json({
        message: "There is no profile for this user.",
      });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Creating profile for user, post request, also private
router.post("/", auth, async (req, res) => {
  const { dateofbirth, phone, adress, bio } = req.body;
  const profileData = {
    user: req.user.id,
    dateofbirth,
    phone,
    adress,
    bio,
  };
  try {
    // If there is no profile, create new doc in database, if there is profile, we can update it with this route
    let profile = await Profile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { $set: profileData },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        useFindAndModify: true,
      }
    );

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get all profiles from database
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get profile by his id. Route is public so everyone can find profile on the internet and we can send link to someone else
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name"]);
    // check if there is profile
    if (!profile) {
      return res.status(400).json({
        message: "Profile not found",
      });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    // If there is wrong ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        msg: "Profile not found",
      });
    }
    res.status(500).send("Server Error");
  }
});

// Delete user, his profile, his posts and comments
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user

    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ message: "User deleted" });

    // delete all comments
    // get all posts
    const allPosts = await Post.find();
    // delete all comments by user in each post

    for (const post of allPosts) {
      post.comments = post.comments.filter(
        (comm) => comm.user.toString() !== req.user.id
      );
      post.save();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const schema = Joi.object({
  school: Joi.string()
    .required()
    .messages({ "any.required": "Please enter school" }),
}).options({ allowUnknown: true });

// Adding education to user's profile, this is optional in frontend, and if user wants to add education, school will be required field
router.put("/education", auth, async (req, res) => {
  // Validation
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { school, fieldofstudy, from, to, current } = req.body;

  const newEducation = {
    school,
    fieldofstudy,
    from,
    to,
    current,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEducation);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete education from an array, so if we want to delete one of our education record we can do it
router.delete("/education/:eduId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.eduId
    );
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
