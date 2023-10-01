import { Injectable } from '@nestjs/common';
import { SyncserviceService } from "../syncservice/syncservice.service"

@Injectable()
export class UserService {
  constructor(private readonly syncserviceService: SyncserviceService) {}

  async fetchUserInfo(address: string) {
    return this.syncserviceService.getAccount(address);
  }

  async fetchUserBalance(account_id: string) {
    return this.syncserviceService.getAccountBalance(account_id);
  }

  async fetchUserSlotAndNonce(account_id: string) {
    return this.syncserviceService.getAccountOrderAndSlot(account_id);
  }
}
