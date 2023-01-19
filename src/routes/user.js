const express = require("express");
const { Usermodel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  const all = await Usermodel.find();
  res.send("user here", all);
});

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const isPresent = await Usermodel.findOne({ email });
  if (isPresent) {
    res.send({ msg: "User already exists", status: false });
  } else {
    try {
      bcrypt.hash(password, 4, async function (err, hash) {
        if (err) {
          res.send({ msg: "Something went wrong" });
        } else {
          await Usermodel.create({ email, password: hash });
          res.send({ msg: "User created successfully", status: true });
        }
      });
    } catch (err) {
      res.send({ msg: "Something went wrong !" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isPresent = await Usermodel.findOne({ email });
  if (isPresent) {
    const hashpassword = isPresent.password;
    bcrypt.compare(password, hashpassword, function (err, result) {
      if (result) {
        console.log("ok");
        const token = jwt.sign({ data: "dataD" }, "top_secret_key", {
          expiresIn: "1h",
        });
        res.send({ msg: "Login Successfully !", token: token });
      } else if (err) {
        res.send({ msg: "Please try again", status: false });
      }
    });
  } else {
    res.send({ msg: "Please try again", status: false });
  }
});

module.exports = userRouter;
