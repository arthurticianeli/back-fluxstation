import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AbastecimentosController } from './abastecimentos.controller';
import { AbastecimentosService } from './abastecimentos.service';

@Module({
  controllers: [AbastecimentosController],
  providers: [AbastecimentosService],
  imports: [PrismaModule],
})
export class AbastecimentosModule {}
