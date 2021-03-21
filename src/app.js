const express = require("express");
const { Cat } = require("./models");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const uploadFile = (file) => new Promise((resolve, reject) => {
  const fileKey = Date.now().toString();

  const params = {
      Body: file.buffer,
      Bucket: process.env.BUCKET_NAME,
      Key: fileKey,
  }

  s3.putObject(params, (err) => {
      if (err) {
          reject(err);
      } else {
          resolve(`${process.env.BUCKET_URL}/${fileKey}`)
      }
  })
})

const app = express();

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.static('public'))

app.post("/cats", upload.single('image'), (req, res) => {
  uploadFile(req.file)
        .then((imageUrl) => {
            req.body.imageUrl = imageUrl;
            return Cat.create(req.body);
        })
        .then((cat) => res.status(201).json(cat))
        .catch(error => {
            res.status(500).json({ error: error })
        })
});

app.get("/cats", (req, res) => {
  Cat.findAll({ where: req.query }).then((cats) =>
    res.status(200).json({ cats })
  );
});

app.get("/cats/:catId", (req, res) => {
  Cat.findByPk(req.params.catId).then((cat) => res.status(200).json(cat));
});

app.patch("/cats/:catId", (req, res) => {
  Cat.update(req.body, {
    where: { id: req.params.catId },
  }).then(([catsUpdated]) => res.status(201).send({ catsUpdated }));
});

app.patch("/feed/:catId", (req, res) => {
  Cat.update(
    { lastFed: new Date() },
    { where: { id: req.params.catId } }
  ).then(() => res.status(201).send());
});

app.delete("/cats/:catId", (req, res) => {
  Cat.destroy(
    { where: { id: req.params.catId } }
  ).then(catsDeleted => res.status(201).send({ catsDeleted }));
});

app.get('*', (_, res) => {
  res.redirect('/');
});

module.exports = app;
