import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbastecimentosService } from './abastecimentos.service';
import { CreateAbastecimentoDto } from './dto/create-abastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/update-abastecimento.dto';

@Controller('abastecimentos')
@ApiTags('abastecimentos')
export class AbastecimentosController {
  constructor(private readonly abastecimentosService: AbastecimentosService) {}

  @Post()
  create(@Body() createAbastecimentoDto: CreateAbastecimentoDto) {
    return this.abastecimentosService.create(createAbastecimentoDto);
  }

  @Get()
  findAll() {
    return this.abastecimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abastecimentosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAbastecimentoDto: UpdateAbastecimentoDto,
  ) {
    return this.abastecimentosService.update(+id, updateAbastecimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abastecimentosService.remove(+id);
  }
}
