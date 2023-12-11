import { Model } from 'mongoose';
import { RestaurantService } from '@/restaurant/restaurant.service';
import { Restaurant } from '@/restaurant/schema/restaurant.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FileUploadService } from '@/file/file.service';
import { ConfigService } from '@nestjs/config';
import { Review } from '@/review/schema/review.schema';
import { NotFoundException } from '@nestjs/common';

interface RatingDistribution {
  count: number;
  rating: number;
}

describe('RestaurantService', () => {
  let service: RestaurantService;
  let reviewModel: Model<Review>;
  let restaurantModel: Model<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        FileUploadService,
        ConfigService,
        {
          provide: getModelToken('Review'),
          useValue: {
            aggregate: jest.fn(),
          },
        },
        {
          provide: getModelToken('Photo'),
          useValue: {},
        },
        {
          provide: getModelToken('Restaurant'),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<RestaurantService>(RestaurantService);
    reviewModel = module.get<Model<Review>>(getModelToken('Review'));
    restaurantModel = module.get<Model<Restaurant>>(getModelToken('Restaurant'));
  }, 10000);

  it('should return an rating distribution array with valid restaurant id', async () => {
    const mockRestaurantId = '655afde260f02f37d6f448b2';
    const mockRestautantDoc = { _id: mockRestaurantId };
    const mockResult: RatingDistribution[] = [
      {
        count: 5,
        rating: 5,
      },
      {
        count: 6,
        rating: 4,
      },
      {
        count: 6,
        rating: 3,
      },
      {
        count: 6,
        rating: 2,
      },
      {
        count: 7,
        rating: 1,
      },
    ];
    jest
      .spyOn(restaurantModel, 'findOne')
      .mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(mockRestautantDoc) } as any);
    jest.spyOn(reviewModel, 'aggregate').mockResolvedValue(mockResult);
    const result = await service.findRestaurantRating(mockRestaurantId);
    expect(reviewModel.aggregate).toBeCalledWith([
      { $match: { placeId: mockRestaurantId, placeType: 'Restaurant' } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $project: { _id: 0, rating: '$_id', count: 1 } },
      { $sort: { rating: -1 } },
    ]);
    expect(result).toEqual(mockResult);
  });

  it('should thew NotFoundException with non-exist restaurant id', async () => {
    const mockRestaurantId = '655afde260f02f37d6f448b0';
    jest
      .spyOn(restaurantModel, 'findOne')
      .mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) } as any);
    await expect(service.findRestaurantRating(mockRestaurantId)).rejects.toThrowError(
      NotFoundException
    );
  });
});