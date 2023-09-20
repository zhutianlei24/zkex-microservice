import { Module } from '@nestjs/common';
import { SyncserviceService } from './syncservice.service';
import { SyncserviceController } from './syncservice.controller';

@Module({
  controllers: [SyncserviceController],
  providers: [SyncserviceService],
})
export class SyncserviceModule {}
