import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/utils/gloabl.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradeService {
  // return the current orders
  getOrders() {
    return [...GlobalService.buyOrders, ...GlobalService.sellOrders];
  }

  buyOrderMatching(createTradeDto: CreateTradeDto) {
    if (createTradeDto.price < GlobalService.sellOrders[0].price)
    {
      // add this buy order to the buy order list and sort it with price desc
    }
    else
    {
      // do order matching logic
    }
  }

  sellOrderMatching(createTradeDto: CreateTradeDto) {
    if (createTradeDto.price > GlobalService.buyOrders[0].price)
    {
      // add this sell order to the sell order list and sort it with price asc
    }
    else
    {
      // do order matching logic
    }
  }
}
