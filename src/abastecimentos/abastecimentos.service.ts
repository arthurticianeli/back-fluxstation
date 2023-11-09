import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';

@Injectable()
export class AbastecimentosService {
  constructor(private prisma: PrismaService) {}

  create(createAbastecimentoDto: CreateAbastecimentoDto) {
    return this.prisma.abastecimentos.create({ data: createAbastecimentoDto });
  }

  findAll() {
    return this.prisma.abastecimentos.findMany();
  }

  findOne(id: number) {
    return this.prisma.abastecimentos.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAbastecimentoDto: UpdateAbastecimentoDto) {
    return this.prisma.abastecimentos.update({
      where: { id },
      data: updateAbastecimentoDto,
    });
  }

  remove(id: number) {
    return this.prisma.abastecimentos.delete({ where: { id } });
  }
}
