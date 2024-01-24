const express = require("express");
const verifyCookie = require("./verifyCookie");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const User = require("./model")
const cors = require("cors")
require("dotenv").config();
const database = require("./db")
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
database()

app.post("/api/register", async (req, res) => {
  console.log("req.body ::: ",req.body)
  const { name, email, password } = req.body;
  console.log("req.body : ", req.body);
  try {
    if (name && email && password) {
      const hashPassword = await bcrypt.hash(password,10)
      const newUser = await User({ name, email, password: hashPassword });
      const saveUser = await newUser.save();
      if (saveUser) {
         const token = await jwt.sign({ id: saveUser.id }, process.env.JWT_SECRET);

         res.cookie("jwt", token, {
           httpOnly: true,
           maxAge: 60 * 60 * 1000, // 1 hour
         });
        return res
          .status(200)
          .json({ message: "User register successfully", saveUser, token });
      } else {
        return res.status(400).json({ error: "something wrong" });
      }
    } else {
      return res.status(400).json({ error: "All fields are required" });
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.json({ user });
});

app.get("/",verifyCookie, (req, res) => {
  res.status(200).json({ message: "Congratulations you are authenticate user" });
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie("jwt");

  res.status(200).json({ message: "Logged out successfully" });
});


app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
