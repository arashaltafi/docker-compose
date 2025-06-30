"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
exports.initRedis = initRedis;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redis = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
async function initRedis() {
    await exports.redis.connect();
    console.log('✅ Redis connected');
}
