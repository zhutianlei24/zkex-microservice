import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/utils/gloabl.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import * as zklink from 'zklink-js-sdk';

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
      GlobalService.buyOrders.push({price: createTradeDto.price, amount :createTradeDto.amount});
      let sortedArray = GlobalService.buyOrders.sort((n1, n2) => n2.price - n1.price);
    }
    else
    {
      // do order matching logic
      let buyPrice = createTradeDto.price;
      let residue = createTradeDto.amount;

      for(let sellOrder of  GlobalService.sellOrders) {
        // eat up
        if(residue <= 0) {
          break;
        }
        if(buyPrice >= sellOrder.price) {
        }
      }

    }
  }

  sellOrderMatching(createTradeDto: CreateTradeDto) {
    if (createTradeDto.price > GlobalService.buyOrders[0].price)
    {
      // add this sell order to the sell order list and sort it with price asc
      GlobalService.sellOrders.push({price: createTradeDto.price, amount :createTradeDto.amount});
      let sortedArray = GlobalService.sellOrders.sort((n1, n2) => n1.price - n2.price);
    }
    else
    {
      // do order matching logic
    }
  }
}
