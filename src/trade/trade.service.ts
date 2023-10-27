import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/utils/gloabl.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import * as zklink from 'zklink-js-sdk';
import Web3 from 'web3';
import { EthMessageSigner } from 'zklink-js-sdk/build/eth-message-signer';
import { ethers } from 'ethers';
import { Signer } from 'zklink-js-sdk/build/signer';
import { OrderData, OrderMatchingEntries } from 'zklink-js-sdk';

@Injectable()
export class TradeService {
  // return the current orders
  getOrders() {
    return [...GlobalService.buyOrders, ...GlobalService.sellOrders];
  }

  buyOrderMatching(createTradeDto: CreateTradeDto) {
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_ENDPOINT)

    // Initialize the zkSigner and ethSigner for submitter
    const zkSignerSubmitter = Signer.fromPrivateKey(Uint8Array.from(Array.from(process.env.ZKLINK_SUBMITTER_PRIVATEKEY).map(letter => letter.charCodeAt(0))));
    const ethSignerSubmitter = new EthMessageSigner(new ethers.Wallet(process.env.ZKLINK_SUBMITTER_PRIVATEKEY, provider))

    // Initialize the zkSigner and ethSigner for User
    const zkSingerUser = Signer.fromPrivateKey(Uint8Array.from(Array.from(process.env.USER_PRIVATEKEY).map(letter => letter.charCodeAt(0))));
    const ethSignerUser = new EthMessageSigner(new ethers.Wallet(process.env.USER_PRIVATEKEY, provider))

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
          // construct the order
          const order_data_taker = {
            type: 'order',
            account_id: ???,
            sub_account_id: 4,
            slot: 1,
            nonce: 1,
            baseTokenId: 141,
            quoteTokenId: 1,
            price: sellOrder.price * 10 ** 18,
            amount: sellOrder.amount * 10 ** 18,
            is_sell: 1,
            taker_fee_ratio: 255,
            maker_fee_ratio:255
          } as unknown as OrderData 

          
        const order_data_maker = {
          type: 'order',
          account_id: ???,
          sub_account_id: 4,
          slot: 1,
          nonce: 1,
          baseTokenId: 141,
          quoteTokenId: 1,
          price: sellOrder.price * 10 ** 18,
          amount: sellOrder.amount * 10 ** 18,
          is_sell: 0,
          taker_fee_ratio: 255,
          maker_fee_ratio:255
        } as unknown as OrderData 

        const order_matching = {
          accountId: ???,
          subAccountId: 4,
          taker: order_data_taker,
          maker: order_data_maker,
          expectBaseAmount: sellOrder.amount * 10 ** 18,
          expectQuoteAmount: sellOrder.price * 10 ** 18,
          feeTokenId: 141,
          feeTokenSymbol: 'WETH',
          fee: 405000000000000,
        } as unknown as OrderMatchingEntries 
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
