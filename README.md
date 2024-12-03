# KilatStorage with AWS SDK v3 (Node.js)
The example code of basic usage accessing the KilatStorage bucket with Node.JS using AWS SDK for JavaScript v3

# Prerequisites
1. Operating System on Debian / RedHat Family
2. Node.JS version v18 or later
3. KilatStorage credentials from your https://portal.cloudkilat.com/ account

# Usage
1. Install Node.js modules
```
$ npm install
```
2. Copy or rename the `.env.example` file to `.env`
3. Put your KilatStorage credentials on `.env` file (see file `.env.example`)
```
KILAT_STORAGE_ACCESS_KEY_ID="xxxxxxx"
KILAT_STORAGE_SECRET_ACCESS_KEY="xxxxxxx"
KILAT_STORAGE_ENDPOINT="https://s3-id-jkt-1.kilatstorage.id"
KILAT_STORAGE_BUCKETNAME="my_bucket_name"
```
4. Run the script
```
$ npm run bucket:create # for create your bucket
$ npm run bucket:upload # for upload the objects, such as (images, videos, etc)

or

# Directly using node command
$ node createBucket.js # for create your bucket
$ node upload.js # for upload the objects, such as (images, videos, etc)
```

The `upload.js` will upload the image file on `./img` directory to the bucket.

# License
For the license [License](./LICENSE)

# Contributor
Anggit M Ginanjar - <anggit.ginanjar.dev@gmail.com>
