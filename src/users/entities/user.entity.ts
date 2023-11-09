import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Abastecimento } from 'src/abastecimentos/entities/abastecimento.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty({ required: false, nullable: true })
  abastecimentos: Abastecimento[] | null;
}
