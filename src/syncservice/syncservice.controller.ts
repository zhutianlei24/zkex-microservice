import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SyncserviceService } from './syncservice.service';
import { AccountIdDto } from './dto/account-id.dto';
import { AccountAddressDto } from './dto/account-address.dto';

@Controller('syncservice')
export class SyncserviceController {
  constructor(private readonly syncserviceService: SyncserviceService) {}

  @Post("/account")
  getAccountDetails(@Body() accountAddressDto: AccountAddressDto) {
    return this.syncserviceService.getAccount(accountAddressDto.address)
  }

  @Post("/account-balance")
  getAccountBalance(@Body() accountIdDto: AccountIdDto) {
    return this.syncserviceService.getAccountBalance(accountIdDto.accountId)
  }

  @Post("/account-order-and-slot")
  getAccountOrderAndSlot(@Body() accountIdDto: AccountIdDto) {
    return this.syncserviceService.getAccountOrderAndSlot(accountIdDto.accountId)
  }
}
