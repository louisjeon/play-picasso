const router = require("express").Router();
const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const region = "ap-northeast-2";
const bucketName = "play-picasso";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "4",
});

router.get("/", async (req, res) => {
  // const newPost = new Post(req.body);
  // try {
  //   const savedPost = await newPost.save();
  //   res.status(200).json(savedPost);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
