const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const db = require("./config/db").database;

//Database connection

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch(err => {
    console.log("Unable to connect Database  ", db);
  });

//cors middleware intialization
app.use(cors());

app.use(bodyParser.json());
// app.use(express.json());
app.get("/", (req, res) => {
  res.send("Route: / API3");
});

const postRoutes = require("./routes/apis/post");
app.use("/api/posts", postRoutes);
app.listen(4001);
