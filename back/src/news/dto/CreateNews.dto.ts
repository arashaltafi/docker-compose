import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty({ example: 'title' })
    @IsNotEmpty({ message: 'title is required.' })
    title: string;

    @ApiProperty({ example: 'content' })
    @IsNotEmpty({ message: 'content is required.' })
    content: string;
}