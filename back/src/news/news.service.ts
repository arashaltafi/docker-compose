import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { CreateNewsDto } from './dto/CreateNews.dto';
import { UpdateNewsDto } from './dto/UpdateNews.dto';
import { AllNewsDto } from './dto/AllNews.dto';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsService {
    private readonly cacheKeyById = (id: number) => `news:${id}`;
    private readonly cacheKeyAll = (page: number, pageSize: number) =>
        `news:all:page:${page}:size:${pageSize}`;

    private readonly cacheTTL: number;

    constructor(
        @InjectModel(News.name) private newsModel: Model<NewsDocument>,
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
        private readonly configService: ConfigService,
    ) {
        this.cacheTTL = Number(this.configService.get<string>('CACHE_TTL_SECONDS', '60'));
    }

    async create(dto: CreateNewsDto) {
        const last = await this.newsModel.findOne({}, { id: 1 }).sort({ id: -1 }).exec();
        const id = last && typeof last.id === 'number' ? last.id + 1 : 1;

        const doc = new this.newsModel({ id, title: dto.title, content: dto.content });
        await doc.save();

        // Invalidate all cached lists
        await this.redis.keys('news:all:*').then(keys => {
            if (keys.length) this.redis.del(keys);
        });

        return doc;
    }

    async list(dto: AllNewsDto) {
        const cacheKey = this.cacheKeyAll(dto.page, dto.pageSize);

        const cache = await this.redis.get(cacheKey);
        if (cache) {
            return JSON.parse(cache);
        }

        const skip = (dto.page - 1) * dto.pageSize;
        const totalItems = await this.newsModel.countDocuments();

        const items = await this.newsModel
            .find({}, { _id: 0, id: 1, title: 1, content: 1 })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(dto.pageSize)
            .exec();

        const result = {
            items,
            totalItems,
            page: dto.page,
            pageSize: dto.pageSize,
            totalPages: Math.ceil(totalItems / dto.pageSize),
        };

        await this.redis.set(cacheKey, JSON.stringify(result), 'EX', this.cacheTTL);

        return result;
    }

    async getById(id: number) {
        const cacheKey = this.cacheKeyById(id);

        const cache = await this.redis.get(cacheKey);
        if (cache) {
            return JSON.parse(cache);
        }

        const item = await this.newsModel.findOne(
            { id },
            { _id: 0, id: 1, title: 1, content: 1 },
        ).exec();

        if (!item) throw new NotFoundException('News not found');

        await this.redis.set(cacheKey, JSON.stringify(item), 'EX', this.cacheTTL);

        return item;
    }

    async update(dto: UpdateNewsDto) {
        const updated = await this.newsModel
            .findOneAndUpdate(
                { id: dto.id },
                { title: dto.title, content: dto.content },
                { new: true },
            )
            .exec();

        if (!updated) throw new NotFoundException('News not found');

        await this.redis.set(
            this.cacheKeyById(dto.id),
            JSON.stringify(updated),
            'EX',
            this.cacheTTL,
        );

        await this.redis.keys('news:all:*').then(keys => {
            if (keys.length) this.redis.del(keys);
        });

        return updated;
    }

    async remove(id: number) {
        const deleted = await this.newsModel.findOneAndDelete({ id }).exec();
        if (!deleted) throw new NotFoundException('News not found');

        await this.redis.del(this.cacheKeyById(id));
        await this.redis.keys('news:all:*').then(keys => {
            if (keys.length) this.redis.del(keys);
        });

        return { message: 'Deleted' };
    }
}