import { PartialType } from '@nestjs/mapped-types';
import { BaseUserDto, UserRole } from './base-user.dto';
import { Exclude } from 'class-transformer';

export class CreateUserDto extends PartialType(BaseUserDto) {
  @Exclude()
  nickname: string;

  @Exclude()
  firstName: string;

  @Exclude()
  lastName: string;

  @Exclude()
  role: UserRole.USER;

  @Exclude()
  description: string;

  @Exclude()
  authToken: string;

  @Exclude()
  savedAttractions: object[];

  @Exclude()
  savedRestaurants: object[];
}
