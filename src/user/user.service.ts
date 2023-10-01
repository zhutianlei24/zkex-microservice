import { Inject, Injectable } from '@nestjs/common';
import { SyncserviceService } from "../syncservice/syncservice.service"
import { User } from './entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(private readonly syncserviceService: SyncserviceService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async syncUser(address: string) {
    let user: User = {
      address: address,
      account_id: "",
      balance: {},
      slotAndNonce: []
    };
    try {
      // Get userInfo
      const userInfo = await this.fetchUserInfo(address);
      // Init user account ID
      user.account_id = userInfo.result.id;
      console.log(userInfo);
      // Get userBalance
      const userBalance = await this.fetchUserBalance(userInfo.result?.id);
      const userWallet = userBalance.result['4'];
      console.log(userWallet);
      // Init user balance
      if (userWallet) {
        let balanceMap = new Map();
        for(let token in userWallet) {
          balanceMap.set(token, userWallet[token]);
        }
        user.balance = Object.fromEntries(balanceMap);
      }
      // Get user slot and nonce
      const userSlotAndNonce = await this.fetchUserSlotAndNonce(userInfo.result?.id);
      const orderList = userSlotAndNonce.result['4'];
      console.log(orderList)
      // Init user slot and nonce
      if (orderList) {
        for (let order in orderList) {
          user.slotAndNonce.push([order, orderList[order]['nonce']]);
        }
      }
    } catch (error) {
      return "user sync failed, try to get some tokens for your #4 subaccount first and check your account address again"
    }
    console.log(user)
    await this.cacheManager.set(address, user, 0);
    return user;
  }

  async getUser(address: string) {
    const user = await this.cacheManager.get(address);
    return user
  }

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
