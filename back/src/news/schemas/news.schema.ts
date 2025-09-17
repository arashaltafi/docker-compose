import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
    @Prop({ required: true, unique: true })
    id: number;

    @Prop({ required: true })
    title: string;

    @Prop()
    content: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

// Index for fast lookups by token
NewsSchema.index({ id: 1 }, { sparse: true });