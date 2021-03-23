const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = (file) => new Promise((resolve, reject) => {
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