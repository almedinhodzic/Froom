const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
// Registration route, where everyone can access and register new account if email does not exist

// Validation of user inputs
// Validation of our properties in UserSchema, so if something is not good, we will get an error
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Please, enter your name.",
  }),
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
  let { name, email, password } = req.body;

  try {
    // Check if user is already registered in our database
    // We check if email is equal to our req.body.email, so we dont need to type in object email: req.body.email, we used object destructuring previosly
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });
    // Password hash, because we dont want any risk that someone could go in database and see user's password, only user and bcryptjs will know user's password
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    let user = new User({
      name: name,
      email: email,
      password: cryptedPassword,
    });
    //save user in database
    await user.save();

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

module.exports = router;
