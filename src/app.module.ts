import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SyncserviceModule } from './syncservice/syncservice.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SyncserviceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
