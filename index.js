const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const methodOverride = require("method-override");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const s3Route = require("./routes/s3");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, POST, PUT, GET, DELETE, OPTIONS, Access-Control-Allow-Headers, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT");
  next();
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/s3", s3Route);

// app.use(express.static(path.join(__dirname, "/client")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});
