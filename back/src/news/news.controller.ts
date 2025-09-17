import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/CreateNews.dto';
import { UpdateNewsDto } from './dto/UpdateNews.dto';
import { AllNewsDto } from './dto/AllNews.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @ApiOperation({ summary: 'add new news' })
    @ApiBearerAuth()
    @Post()
    create(
        @Body() dto: CreateNewsDto
    ) {
        return this.newsService.create(dto);
    }

    @ApiOperation({ summary: 'get all news' })
    @ApiBearerAuth()
    @Post("all")
    list(
        @Body() dto: AllNewsDto
    ) {
        return this.newsService.list(dto);
    }

    @ApiOperation({ summary: 'get news by id' })
    @ApiBearerAuth()
    @Get(':id')
    async getById(
        @Param('id') id: string
    ) {
        try {
            const numId = +id;
            if (!numId) {
                throw new BadRequestException('id is invalid!');
            }

            const item = await this.newsService.getById(numId);
            if (!item) throw new NotFoundException('Not found');

            return item;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ summary: 'update news' })
    @ApiBearerAuth()
    @Put(':id')
    update(
        @Body() dto: UpdateNewsDto,
    ) {
        return this.newsService.update(dto);
    }

    @ApiOperation({ summary: 'delete news' })
    @ApiBearerAuth()
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const numId = +id;
            if (!numId) {
                throw new BadRequestException('id is invalid!');
            }

            await this.newsService.remove(numId);
            return { message: 'Deleted' };
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}