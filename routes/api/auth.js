const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const dotenv = require("dotenv");

dotenv.config();

// Validation of user inputs
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please, enter a valid email adress.",
  }),
  password: Joi.string().required().min(3).messages({
    "string.min": "Please, enter a password with minimum 3 characters.",
  }),
});

router.post("/", async (req, res) => {
  // Validation
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already registered in our database
  // We check if email is equal to our req.body.email, so we dont need to type in object email: req.body.email, we used object destructuring previosly
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Check if password is correct
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return res.status(400).json({ message: "Invalid Credentials" });
    //Returning json web token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_TOKEN,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// This is public route for testing jwt token and middleware, so we can return user's infos by his token, although we can not get password

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
