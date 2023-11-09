import { ApiProperty } from '@nestjs/swagger';
import { Abastecimentos } from '@prisma/client';

export class Abastecimento implements Abastecimentos {
  @ApiProperty()
  id: number;

  @ApiProperty()
  litros: string;

  @ApiProperty()
  combustivel: string;

  @ApiProperty()
  valorTotal: number;

  @ApiProperty({ required: false, nullable: true })
  userId: number | null;

  @ApiProperty()
  createdAt: Date;
}
