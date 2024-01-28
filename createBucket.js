import 'dotenv/config';
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';

if (!process.env.KILAT_STORAGE_ACCESS_KEY_ID) {
  throw Error('KilatStorage access key is required!')
}

if (!process.env.KILAT_STORAGE_SECRET_ACCESS_KEY) {
  throw Error('KilatStorage secret access key is required!')
}

if (!process.env.KILAT_STORAGE_ENDPOINT) {
  throw Error('KilatStorage endpoint is required!')
}

if (!process.env.KILAT_STORAGE_BUCKETNAME) {
  throw Error('KilatStorage bucket name is required!')
}

const createBucket = async () => {
  // KilatStorage can be accessed using AWS SDK v3 for Node.js
  // - Select the region us-east-1 as default region
  // - We use different endpoint from AWS, thus use https://s3-id-jkt-1.kilatstorage.id
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.KILAT_STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.KILAT_STORAGE_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.KILAT_STORAGE_ENDPOINT
  })

  const command = new CreateBucketCommand({
    ACL: "public-read",
    Bucket: process.env.KILAT_STORAGE_BUCKETNAME,
  })

  console.log('Creating bucket', process.env.KILAT_STORAGE_BUCKETNAME)
  const response = await client.send(command)
  console.log(response);
} 

createBucket();
