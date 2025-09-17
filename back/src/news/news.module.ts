import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News, NewsSchema } from './schemas/news.schema';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})

export class NewsModule { }