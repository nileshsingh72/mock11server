require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("../src/routes/user");
const { connectDb } = require("./config/db");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(process.env.PORT, async (req, res) => {
  console.log(`running on http://localhost:${process.env.PORT}`);
  try {
    await connectDb();
    console.log("connection established");
  } catch (error) {
    console.log("db not conected");
  }
});
