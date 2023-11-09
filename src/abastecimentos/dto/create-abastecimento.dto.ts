import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAbastecimentoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  litros: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  combustivel: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  valorTotal: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: string;
}
