import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SyncserviceModule } from './syncservice/syncservice.module';
import { UserModule } from './user/user.module';
import { TradeModule } from './trade/trade.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SyncserviceModule, UserModule, TradeModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
