# Have I Fed The Cat?

A simple app for tracking when the cat was last fed. Useful for cats who know how to manipulate multiple humans.

## Running the app

This app requires a MySQL database. Connection details should be stored in a `.env` file:

```bash
DB_NAME=have_i_fed_the_cat_app_db
DB_HOST=localhost
DB_PASSWORD=password
DB_USER=root
DB_PORT=3307
```

Clone this repo and install dependencies:

```bash
git clone git@github.com:MCRcodes/have-i-fed-the-cat-demo.git
cd have-i-fed-the-cat-demo
npm install
npm start
```

# Cat Profile Picture Challenge

# Saving files to online service

This is the example code for the `Uploading Images` lecture.

The completed example is viewable on the `image-uploads-solution` branch.

## Setting Up

Clone this repo, and use `npm install` to install dependancies. You will need a `MySQL` instance for data storage. You can start one inside a docker container with:

```bash
docker run -d -p 3307:3306 --name music_library_mysql -e MYSQL_ROOT_PASSWORD=<PASSWORD> mysql
```

You will also need to create a `.env` file with your database connection details. Example ones are given in `.env.example`.

Run the app with `npm start`. By default the app is sevec on `localhost:4000`. Visiting this location in your browser will display the blog page (there won't be any blog posts yet), `localhost:4000/admin.html` will display an upload form for publishing posts.

Currently, the upload form does not work. This is because the app is not set up to handle image uploads. 

## AWS

Before we can upload a file, we need a place to store it. We will be using `S3` (simple storage solution) on `AWS` (Amazon Web Services). To do this, you will need an AWS account.

Sign up for an AWS account [here](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=default&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start). You will need a payment card, but new accounts get access to a free tier for one year, and many services have a permanent free tier.

Once you have your root login, use this [guide](https://docs.aws.amazon.com/mediapackage/latest/ug/setting-up-create-iam-user.html) to create an administrator account for yourself. This is the account you should use to access aws from now on. Store your root user credentials somewhere secure. 

## S3

Use [this guide](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html) to set up a new s3 bucket. Make sure to uncheck the boxes that block public access.

Next we'll configure the bucket so that anybody can read the files that are in there, but only we can upload.

In a web-browser, sign in to the AWS console and select the S3 section. Select the appropriate bucket and click the Permissions tab. A few options are now provided on this page (including Block public access, Access Control List, Bucket Policy, and CORS configuration).

You will need to configure the bucket’s CORS (Cross-Origin Resource Sharing) settings, which will allow your application to access content in the S3 bucket. Each rule should specify a set of domains from which access to the bucket is granted and also the methods and headers permitted from those domains.

For this to work in your application, click ‘Edit’ and enter the following JSON for the bucket’s CORS settings:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD",
            "POST",
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

Click ‘Save changes’ and close the editor.

This tells S3 to allow any domain access to the bucket and that requests can contain any headers, which is generally fine for testing. When deploying, you should change the ‘AllowedOrigin’ to only accept requests from your domain.

## Bucket Policy

Next, we will need to write a `policy` for the bucket. This will allow your front-end to access the images stored in your bucket, and prevent files being uploaded without permission. Copy the following into the `bucket policy` section of the `permissions` page (make sure to add your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "cat-app-publc-read",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[YOUR BUCKET NAME HERE]/*"
        }
    ]
}
```

## Bucket User

Now we will need to create a new user for your api to be able to upload images to your bucket. The process for this is similar to how we set up our admin account, but in this case the account will have a lot fewer permissions. Make sure to download the user access keys and store them somewhere safe. THESE SHOUlD NOT BET COMMITTED TO GIT!

For starters, the account should be enabled for `programatic access` only. This means that the credentials can not be used to access the admin console, thus making life harder for anybody who might get their hands on them.

Now we will make a policy for the user. This sets what the user is allowed to do withing our AWS account. We do this by giving permission, rather than taking it away, so new users in our account aren't allowed to do anything by default. 

In our app user summary, click on permissions, and then click `add permissions`. Click `add existing policies directly` and then click `create policy`.

In the visual editor:

- Select `S3` as the `service`
- In `actions`, select `putObject` and `deleteObject` from the `write` dropdown.
- In `resources` set the access to `specific` and then click `add ARN`, set the `bucket name` for your bucket, and set the `object` to any

Click `review policy`, it should look something like this:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::[YOUR_BUCKET_NAME_HERE]/*"
        }
    ]
}
```

Finally, you should add your app user keys and bucket details to your `.env`:

```bash
BUCKET_NAME=[BUCKET_NAME]
BUCKET_URL=https://[BUCKET_NAME].s3-[BUCKET_REGION].amazonaws.com
AWS_ACCESS_KEY_ID=[APP_USER_KEY]
AWS_SECRET_ACCESS_KEY=[APP_USER_SECRET]
```

## Handling Files in our App

To be able to save files into our bucket, we will need to install two modules, `multer` and `aws-sdk`.

### Multer

Multer is a middleware which lets us handle `multipart/form-data`. This is the content-type we use to send files in http request. 

Install multer with `npm i -S multer`. To use it, we need to add it to our router:

```js
// src/app.js

...
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
  });
...
```

This tells multer that we want to hold uploaded files in memory and then handle their final storage ourselves.

Next, we need to add our `upload` to our middlware chain:

```js
// src/app.js

...
app.post("/cats", upload.single('file'), (req, res) => {
  Cat.create(req.body).then((cat) => res.status(201).json(cat));
});
...
```

This tells multer to look in our `request` for a propery matching the string we give it. In this case that is `file`. This then becomes accessible as `req.file`. 

### AWS-SDK

The `aws-sdk` (software development kit) give us access to methods that let us interact with AWS services. To use it, we will need to require it in our controller, and then use it to create a `new AWS.S3()`:

```js
// src/app.js

...
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
...

```

For now we will keep our code simple, but note that this would benefit from being abstracted into a `middleware` and `service`.

We can now use our `s3` object to write a function to upload our file to s3:

```js
// src/app.js
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
```

Note that `AWS-SDK` methods take a `callback function`, rather than returning `promises`, so in this case we are wrapping the function in a call in a `new Promise`. This will help keep our code readable.

Now we need to change our controller to use our `uploadFile` function, before saving the rest of our post to the database:

```js
// src/app.js

...
app.post("/cats", upload.single('file'), (req, res) => {
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
...
```

Here we are calling our `uploadFile` function, which saves the file to the bucket, and sets the current time as the file name. Next it returns the `imageUrl`, which we then add to our `req.body` and then feed into our `createItem` helper function.

If everything has worked, we should be able to use the `admin.html` page to upload a post, and then view it at `localhost:4000`.

## Next Steps

- There is currently no authenticaton required to upload images. If you want to deploy this as an app, then you should add a password middleware to your `create`, `update` and `delete` routes.

- The frontend is completely unstyled, you could add some `css` files, or you could use the skills you gain from the `frontend` module to make a `react app`.
