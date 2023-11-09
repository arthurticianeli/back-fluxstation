import { Module } from '@nestjs/common';
import { AbastecimentosModule } from './abastecimentos/abastecimentos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AbastecimentosModule],
})
export class AppModule {}
