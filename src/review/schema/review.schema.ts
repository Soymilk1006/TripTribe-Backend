import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Photo, PhotoSchema } from '../../schema/photo.schema';
import { User } from '@/user/schema/user.schema';
import { Attraction } from '@/attraction/schema/attraction.schema';
import { Restaurant } from '@/restaurant/schema/restaurant.schema';

export type ReviewDocument = mongoose.HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: [PhotoSchema], default: [] })
  photos: Photo[];

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true, type: mongoose.Types.ObjectId, refPath: 'placeType' })
  placeId: Attraction | Restaurant;

  @Prop({ required: true, enum: ['Attraction', 'Restaurant'] })
  placeType: 'Attraction' | 'Restaurant';
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({ placeType: 1, placeId: 1 });
