import { z } from "zod";

export const configSchema = z.object({
  accessKeyId: z.string(),
  secretAccessKey: z.string(),
  endpoint: z.string(),
  bucketName: z.string(),
})

export type KilatStorageConfig = z.infer<typeof configSchema>
