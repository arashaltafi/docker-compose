import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AllNewsDto {
    @ApiProperty({ example: 'page' })
    @Type(() => Number) // converts query string to number
    @IsInt({ message: 'page must be an integer' })
    @Min(1, { message: 'page must be at least 1' })
    page: number = 1; // default value

    @ApiProperty({ example: 'pageSize' })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'pageSize must be an integer' })
    @Min(1, { message: 'pageSize must be at least 1' })
    pageSize: number = 10; // default value
}