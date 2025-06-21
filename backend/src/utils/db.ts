import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function initMongo(): Promise<void> {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('✅ MongoDB connected');
}