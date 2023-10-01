import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/info/:address")
  async fetchUserInfo(@Param() address) {
    let user: User = {
      address: address,
      account_id: "",
      balance: {},
      slotAndNonce: []
    };
    try {
      // Get userInfo
      const userInfo = await this.userService.fetchUserInfo(address.address);
      // Init user account ID
      user.account_id = userInfo.result.id;
      console.log(userInfo);
      // Get userBalance
      const userBalance = await this.userService.fetchUserBalance(userInfo.result?.id);
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
      const userSlotAndNonce = await this.userService.fetchUserSlotAndNonce(userInfo.result?.id);
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
    return user;
  }

}
