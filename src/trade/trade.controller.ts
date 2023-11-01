import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get(':address')
  existingOrders() {
    return this.tradeService.getOrders();
  }

  @Post('buyOrder/:address')
  buyOrderMatching(@Param('address') address, @Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.buyOrderMatching(address, createTradeDto);
  }

  @Post('sellOrder/:address')
  sellOrderMatching(@Param('address') address, @Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.sellOrderMatching(address, createTradeDto);
  }

}
