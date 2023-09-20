import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SyncserviceModule } from './syncservice/syncservice.module';

@Module({
  imports: [SyncserviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
