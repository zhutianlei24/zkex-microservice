import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get()
  existingOrder () {
    return this.tradeService.getOrders();
  }

  @Post()
  buyOrderMatching(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.buyOrderMatching(createTradeDto);
  }

  @Post()
  sellOrderMatching(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.sellOrderMatching(createTradeDto);
  }

}
