import 'dotenv/config'
import { S3Client, PutObjectCommand, type S3ClientConfig } from '@aws-sdk/client-s3'
import { configSchema } from './types'
import {createReadStream} from 'fs'

const env = configSchema.parse({
  accessKeyId: process.env.KILAT_STORAGE_ACCESS_KEY_ID,
  secretAccessKey: process.env.KILAT_STORAGE_SECRET_ACCESS_KEY,
  endpoint: process.env.KILAT_STORAGE_ENDPOINT,
  bucketName: process.env.KILAT_STORAGE_BUCKETNAME
})

const upload = async (): Promise<void> => {
  try {
    const localFilePath = './img/icon-cloudkilat-white@2x.png'
    const fileStream = createReadStream(localFilePath)
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

    // Upload image from ./img directory
    const command = new PutObjectCommand({
      ACL: 'public-read',
      Bucket: process.env.KILAT_STORAGE_BUCKETNAME,
      Key: 'icon-cloudkilat-white@2x.png',
      Body: fileStream
    })
    console.log('Uploading object to', process.env.KILAT_STORAGE_BUCKETNAME)
    const response = await client.send(command)
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

upload()
