const express = require("express");
const router = express.Router();
const multer = require("multer");
const r2 = require("../r2/client"); // make sure this is also CommonJS
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  const key = `uploads/${Date.now()}-${file.originalname}`;

  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));

  const fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
  res.json({ fileUrl });
});

module.exports = router;