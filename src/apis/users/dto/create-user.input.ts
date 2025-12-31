// users/dto/create-user.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  MinLength,
  IsInt,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @Field(() => String)
  @IsString()
  phone: string;

  // ✅ Date가 아닌 String으로 받기
  @Field(() => String)
  @IsDateString()
  birthDate: string;

  @Field(() => Boolean)
  @IsBoolean()
  termsAgreed: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  privacyAgreed: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsBoolean()
  @IsOptional()
  marketingAgreed?: boolean;
}
