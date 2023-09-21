import { Module } from '@nestjs/common';
import { SyncserviceService } from './syncservice.service';
import { SyncserviceController } from './syncservice.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SyncserviceController],
  providers: [SyncserviceService],
})
export class SyncserviceModule {}
