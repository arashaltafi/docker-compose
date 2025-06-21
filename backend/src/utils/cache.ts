import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const redis = createClient({ url: process.env.REDIS_URL });
export async function initRedis(): Promise<void> {
  await redis.connect();
  console.log('✅ Redis connected');
}