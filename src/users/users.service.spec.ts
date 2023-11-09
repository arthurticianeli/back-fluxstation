import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

export const abastecimentos = [
  {
    id: 1,
    litros: '50',
    combustivel: 'Gasolina',
    valorTotal: 100,
    userId: 1,
    createdAt: '2023-11-05T12:30:00.000Z',
  },
  {
    id: 2,
    litros: '30',
    combustivel: 'Álcool',
    valorTotal: 70,
    userId: 2,
    createdAt: '2023-11-06T10:15:00.000Z',
  },
];

export const fakeUsers = [
  {
    id: 1,
    name: 'Usuário 1',
    email: 'usuario1@example.com',
    password: 'senha1',
    abastecimentos: abastecimentos,
  },
  {
    id: 2,
    name: 'Usuário 2',
    email: 'usuario2@example.com',
    password: 'senha2',
    abastecimentos: abastecimentos,
  },
];

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(fakeUsers[0]),
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
    delete: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of users`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        include: { abastecimentos: true },
      });
    });
  });

  describe('findOne', () => {
    it(`should return a single user`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        include: { abastecimentos: true },
        where: { id: 1 },
      });
    });

    it(`should return nothing when user is not found`, async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        include: { abastecimentos: true },
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it(`should create a new user`, async () => {
      const response = await service.create(fakeUsers[0]);

      expect(response).toBe(fakeUsers[0]);
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: fakeUsers[0],
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a user`, async () => {
      const response = await service.update(1, fakeUsers[0]);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakeUsers[0],
      });
    });

    it(`should return Error when no user is found`, async () => {
      const user = {};

      jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error());

      try {
        await service.update(42, user);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 42 },
        data: user,
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete user and return empty body`, async () => {
      expect(await service.remove(1)).toBeUndefined();
      expect(prisma.user.delete).toHaveBeenCalledTimes(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it(`should return Error if user does not exist`, async () => {
      jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error());

      try {
        await service.remove(99);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.user.delete).toHaveBeenCalledTimes(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});
