const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// database init
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database...");
  })
  .catch((error) => {
    console.log(error);
    console.log("failed connected to database");
  });

// Routes
const todoRoutes = require("./routes/todo");

// Routes
app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  res.send("App is working...");
});

// PORT
const port = process.env.PORT || 5000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

exports.app = app;