import { Test, TestingModule } from '@nestjs/testing';
import { AbastecimentosService } from './abastecimentos.service';

describe('AbastecimentosService', () => {
  let service: AbastecimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbastecimentosService],
    }).compile();

    service = module.get<AbastecimentosService>(AbastecimentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
