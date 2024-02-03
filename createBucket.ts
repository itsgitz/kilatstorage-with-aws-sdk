import 'dotenv/config'
import { S3Client, CreateBucketCommand, type S3ClientConfig } from '@aws-sdk/client-s3'
import { configSchema } from './types'

const env = configSchema.parse({
  accessKeyId: process.env.KILAT_STORAGE_ACCESS_KEY_ID,
  secretAccessKey: process.env.KILAT_STORAGE_SECRET_ACCESS_KEY,
  endpoint: process.env.KILAT_STORAGE_ENDPOINT,
  bucketName: process.env.KILAT_STORAGE_BUCKETNAME
})

const createBucket = async (): Promise<void> => {
  // KilatStorage can be accessed using AWS SDK v3 for Node.js
  // - Select the region us-east-1 as default region
  // - We use different endpoint from AWS, thus use https://s3-id-jkt-1.kilatstorage.id
  const config: S3ClientConfig = {
    region: 'us-east-1',
    credentials: {
      accessKeyId: env.accessKeyId,
      secretAccessKey: env.secretAccessKey
    },
    endpoint: env.endpoint
  }
  const client = new S3Client(config)

  const command = new CreateBucketCommand({
    ACL: 'public-read',
    Bucket: env.bucketName
  })

  console.log('Creating bucket', env.bucketName)
  const response = await client.send(command)
  console.log(response)
}

createBucket()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
