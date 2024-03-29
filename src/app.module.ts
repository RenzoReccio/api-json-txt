import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { DomainModule } from './domain/domain.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [DataModule, PresentationModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
