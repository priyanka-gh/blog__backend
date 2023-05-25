const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://blogwebsiteit.netlify.app/');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//myRoutes

const userRoutes = require("./routes/User");
const blogRoutes = require("./routes/Blog");
const likesRoutes = require("./routes/Likes");
const commentRoutes = require("./routes/Comment");

//DB CONNECTION

mongoose.connect(process.env.DATABASE, async (err) => {
  if (err) throw err;
  console.log("conncted to db");
});

//middlewares

app.use(cors());
app.use(cookieParser());

app.use(express.json());
//my routes

app.use("/api", userRoutes);
app.use("/api", blogRoutes);
app.use("/api", likesRoutes);
app.use("/api", commentRoutes);

//ports

const port = process.env.PORT || 8000;

//starting a server

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
