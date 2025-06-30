"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
const cache_1 = require("./utils/cache");
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
async function main() {
    await (0, db_1.initMongo)();
    await (0, cache_1.initRedis)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use('/users', users_1.default);
    app.use((req, res) => {
        res.status(404).json({ msg: 'Not found' });
    });
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ msg: err.message || 'Server error' });
    });
    app.listen(process.env.PORT, () => console.log(`🚀 Backend listening on port ${process.env.PORT}`));
}
main().catch(console.error);
