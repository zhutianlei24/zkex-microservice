import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SyncserviceService } from "../syncservice/syncservice.service"
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, SyncserviceService],
})
export class UserModule {}
