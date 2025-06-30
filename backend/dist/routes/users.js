"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const cache_1 = require("../utils/cache");
const router = (0, express_1.Router)();
const TTL = parseInt(process.env.CACHE_TTL || '60', 10);
async function cache(key, fn) {
    const cached = await cache_1.redis.get(key);
    if (cached)
        return JSON.parse(cached);
    const data = await fn();
    await cache_1.redis.setEx(key, TTL, JSON.stringify(data));
    return data;
}
// GET /users?filter=
router.get('/', async (req, res, next) => {
    try {
        const filter = req.query.filter;
        const key = `users:${filter || 'all'}`;
        const users = await cache(key, () => User_1.default.find(filter ? { name: new RegExp(filter, 'i') } : {}).lean());
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
// GET /users/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const key = `user:${id}`;
        const user = await cache(key, () => User_1.default.findById(id).lean());
        if (!user)
            return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
// PUT /users/:id
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await User_1.default.findByIdAndUpdate(id, req.body);
        await cache_1.redis.del(`user:${id}`, 'users:all');
        res.json({ msg: 'Updated' });
    }
    catch (err) {
        next(err);
    }
});
// DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await User_1.default.findByIdAndDelete(id);
        await cache_1.redis.del(`user:${id}`, 'users:all');
        res.json({ msg: 'Deleted' });
    }
    catch (err) {
        next(err);
    }
});
// DELETE /users
router.delete('/', async (req, res, next) => {
    try {
        await User_1.default.deleteMany({});
        await cache_1.redis.flushDb();
        res.json({ msg: 'All deleted' });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
