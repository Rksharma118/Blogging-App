const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middleware/auth.js");

const userRoute = require("./routes/user.js");
const blogRoute = require("./routes/blog.js");
const Blog = require("./models/blog.js");

app.use(cookieParser());
app.use(checkForAuthCookie("token"));
mongoose
  .connect("mongodb://localhost:27017/blogapp")
  .then((e) => console.log("Mongoose is Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
