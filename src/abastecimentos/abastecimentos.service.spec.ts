import { Test, TestingModule } from '@nestjs/testing';
import { fakeAbastecimentos } from 'src/users/users.service.spec';
import { PrismaService } from '../prisma/prisma.service';
import { AbastecimentosService } from './abastecimentos.service';

export const fakeAbastecimentosCreate = {
  id: 1,
  litros: '50',
  combustivel: 'Gasolina',
  valorTotal: 100,
  abastecimentoId: 1,
  createdAt: '2023-11-05T12:30:00.000Z',
  userId: 1,
};

const prismaMock = {
  abastecimentos: {
    create: jest.fn().mockReturnValue(fakeAbastecimentos[0]),
    findMany: jest.fn().mockResolvedValue(fakeAbastecimentos),
    findUnique: jest.fn().mockResolvedValue(fakeAbastecimentos[0]),
    update: jest.fn().mockResolvedValue(fakeAbastecimentos[0]),
    delete: jest.fn(),
  },
};

describe('AbastecimentosService', () => {
  let service: AbastecimentosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbastecimentosService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AbastecimentosService>(AbastecimentosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of abastecimentos`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeAbastecimentos);
      expect(prisma?.abastecimentos?.findMany).toHaveBeenCalledTimes(1);
      expect(prisma?.abastecimentos?.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it(`should return a single abastecimento`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeAbastecimentos[0]);
      expect(prisma.abastecimentos.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.abastecimentos.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should return nothing when abastecimento is not found`, async () => {
      jest
        .spyOn(prisma.abastecimentos, 'findUnique')
        .mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.abastecimentos.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.abastecimentos.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it(`should create a new abastecimento`, async () => {
      const response = await service.create(fakeAbastecimentosCreate);

      expect(response).toBe(fakeAbastecimentos[0]);
      expect(prisma.abastecimentos.create).toHaveBeenCalledTimes(1);
      expect(prisma.abastecimentos.create).toHaveBeenCalledWith({
        data: { ...fakeAbastecimentos[0], abastecimentoId: 1 },
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a abastecimento`, async () => {
      const response = await service.update(1, fakeAbastecimentos[0]);

      expect(response).toEqual(fakeAbastecimentos[0]);
      expect(prisma.abastecimentos.update).toHaveBeenCalledTimes(1);
      expect(prisma.abastecimentos.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakeAbastecimentos[0],
      });
    });

    it(`should return Error when no abastecimento is found`, async () => {
      const abastecimento = {};

      jest
        .spyOn(prisma.abastecimentos, 'update')
        .mockRejectedValue(new Error());

      try {
        await service.update(42, abastecimento);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.abastecimentos.update).toHaveBeenCalledWith({
        where: { id: 42 },
        data: abastecimento,
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete abastecimento and return empty body`, async () => {
      expect(await service.remove(1)).toBeUndefined();
      expect(prisma.abastecimentos.delete).toHaveBeenCalledTimes(1);
      expect(prisma.abastecimentos.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should return Error if abastecimento does not exist`, async () => {
      jest
        .spyOn(prisma.abastecimentos, 'delete')
        .mockRejectedValue(new Error());

      try {
        await service.remove(99);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.abastecimentos.delete).toHaveBeenCalledTimes(1);
      expect(prisma.abastecimentos.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});
