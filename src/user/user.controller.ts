import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/info/:address")
  async fetchUserInfo(@Param() address) {
    return this.userService.syncUser(address.address)
  }

  @Get("/test/:address")
  async fetchUserInfotest(@Param() address) {
    console.log("triggered!")
    return this.userService.getUser(address.address)
  }

}
