import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbastecimentosController } from './abastecimentos.controller';
import { AbastecimentosService } from './abastecimentos.service';

describe('AbastecimentosController', () => {
  let controller: AbastecimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbastecimentosController],
      providers: [AbastecimentosService, PrismaService],
    }).compile();

    controller = module.get<AbastecimentosController>(AbastecimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
