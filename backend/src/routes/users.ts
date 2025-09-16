import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { redis } from '../utils/cache';

const router = Router();
const TTL = parseInt(process.env.CACHE_TTL || '60', 10);

async function cache<T>(key: string, fn: () => Promise<T>) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached) as T;
  const data = await fn();
  await redis.setEx(key, TTL, JSON.stringify(data));
  return data;
}

/**
 * POST /users
 * Create a new user
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ msg: 'Name and email are required' });
    }

    const user = new User({ name, email });
    const saved = await user.save();

    // Invalidate user list cache
    await redis.del('users:all');

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /users?filter=
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = req.query.filter as string;
    const key = `users:${filter || 'all'}`;

    const users = await cache<IUser[]>(key, () =>
      User.find(filter ? { name: new RegExp(filter, 'i') } : {}).lean()
    );

    res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /users/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const key = `user:${id}`;
    const user = await cache<IUser | null>(key, () =>
      User.findById(id).lean()
    );

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /users/:id
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    await User.findByIdAndUpdate(id, req.body, { new: true });
    await redis.del(`user:${id}`);
    await redis.del('users:all');

    res.json({ msg: 'Updated' });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    await User.findByIdAndDelete(id);
    await redis.del(`user:${id}`);
    await redis.del('users:all');

    res.json({ msg: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /users
 * Delete all users
 */
router.delete('/', async (req, res, next) => {
  try {
    await User.deleteMany({});
    await redis.flushDb();
    res.json({ msg: 'All deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;