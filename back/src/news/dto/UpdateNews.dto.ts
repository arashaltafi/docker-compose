import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateNewsDto {
    @ApiProperty({ example: 'id' })
    @IsNotEmpty({ message: 'id is required.' })
    id: number;

    @ApiProperty({ example: 'title' })
    @IsNotEmpty({ message: 'title is required.' })
    title: string;

    @ApiProperty({ example: 'content' })
    @IsNotEmpty({ message: 'content is required.' })
    content: string;
}