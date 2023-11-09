import { Test, TestingModule } from '@nestjs/testing';
import { AbastecimentosController } from './abastecimentos.controller';
import { AbastecimentosService } from './abastecimentos.service';

describe('AbastecimentosController', () => {
  let controller: AbastecimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbastecimentosController],
      providers: [AbastecimentosService],
    }).compile();

    controller = module.get<AbastecimentosController>(AbastecimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
