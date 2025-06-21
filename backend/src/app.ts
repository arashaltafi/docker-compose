import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initMongo } from './utils/db';
import { initRedis } from './utils/cache';
import userRoutes from './routes/users';

dotenv.config();

async function main() {
  await initMongo();
  await initRedis();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/users', userRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ msg: 'Not found' });
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ msg: err.message || 'Server error' });
  });

  app.listen(process.env.PORT, () =>
    console.log(`🚀 Backend listening on port ${process.env.PORT}`)
  );
}

main().catch(console.error);