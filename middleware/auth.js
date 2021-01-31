const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
// Creating middleware for token verification and user authorization, so only user who is authorized can do some stuff, example post on blog, see posts etc.

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("auth-token");

  //Check if token does not exists
  if (!token) return res.status(401).json({ message: "Access denied" });

  // If user have token, need verification, if it is correct, he can go next, if not, access denied
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied" });
  }
};
