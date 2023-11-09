import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
