const express = require("express");
const app = express();
const connectDB = require("./connectDB");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
// Testing server on the beggining
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// Connecting our Mongo DB
connectDB();

// Body parser, so we can make post requests
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
