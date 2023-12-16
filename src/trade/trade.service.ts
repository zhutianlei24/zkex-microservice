import { Inject, Injectable } from '@nestjs/common';
import { GlobalService } from 'src/utils/gloabl.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { EthMessageSigner } from 'zklink-js-sdk/build/eth-message-signer';
import { ethers } from 'ethers';
// import { Signer } from 'zklink-js-sdk/build/signer';
import { OrderData, OrderMatchingData } from 'zklink-js-sdk';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import sha256 from 'crypto-js/sha256';
import init, *  as wasm from "../../web-dist/zklink-sdk-web.js";
const {ContractMatchingBuilder,Signer,newContractMatching,newContract,ContractBuilder,RpcClient } = require('./node-dist/zklink-sdk-node');
@Injectable()
export class TradeService {
  // return the current orders
  getOrders() {
    return [...GlobalService.buyOrders, ...GlobalService.sellOrders];
  }

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async buyOrderMatching(address: string, createTradeDto: CreateTradeDto) {
    const userSigner = new Signer(process.env.USER_PRIVATEKEY, 1)
    const zkLinkSigner = new Signer(process.env.ZKLINK_SUBMITTER_PRIVATEKEY, 1)
  
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

      const user: any = await this.cacheManager.get(address);

      for(let sellOrder of GlobalService.sellOrders) {
        // eat up
        if(residue <= 0) {
          break;
        }

        if(buyPrice >= sellOrder.price) {
        let maker_order = new wasm.Order(user.account_id, 1, 1, 1, 141, 1, String(sellOrder.price * 10 ** 18), String(sellOrder.amount * 10 ** 18), true, 255, 255, false);
        let maker = userSigner.createSignedOrder(maker_order);
        console.log(maker);

        let taker_order = new wasm.Order(40, 1, 1, 1, 141, 1, String(sellOrder.price * 10 ** 18), String(sellOrder.amount * 10 ** 18), false, 255, 255, false);
        let taker = zkLinkSigner.createSignedOrder(taker_order);
        console.log(taker);

        let tx_builder = new wasm.OrderMatchingBuilder(40, 1, taker, maker, "405000000000000,", 141, [], [], String(sellOrder.price * 10 ** 18), String(sellOrder.amount * 10 ** 18));
        let order_matching = wasm.newOrderMatching(tx_builder);
        let signature = zkLinkSigner.signOrderMatching(order_matching);
        console.log(signature);

        let submitter_signature = zkLinkSigner.submitterSignature(signature.tx);
        console.log(submitter_signature);
        let rpc_client = new wasm.RpcClient("testnet");
        let tx_hash = await rpc_client.sendTransaction(signature.tx,null,submitter_signature);
        console.log(tx_hash);
      } 
      }
    }
  }

  async sellOrderMatching(address: string, createTradeDto: CreateTradeDto) {
    const userSigner = new Signer(process.env.USER_PRIVATEKEY, 1)
    const zkLinkSigner = new Signer(process.env.ZKLINK_SUBMITTER_PRIVATEKEY, 1)
    if (createTradeDto.price > GlobalService.buyOrders[0].price)
    {
      // add this sell order to the sell order list and sort it with price asc
      GlobalService.sellOrders.push({price: createTradeDto.price, amount :createTradeDto.amount});
      let sortedArray = GlobalService.sellOrders.sort((n1, n2) => n1.price - n2.price);
    }
    else
    {
      // do order matching logic
      let sellPrice = createTradeDto.price;
      let residue = createTradeDto.amount;

      const user: any = await this.cacheManager.get(address);

      for(let buyOrder of GlobalService.buyOrders) {
        // eat up
        if(residue <= 0) {
          break;
        }

        if(sellPrice <= buyOrder.price) {
        let maker_order = new wasm.Order(user.account_id, 1, 1, 1, 141, 1, String(buyOrder.price * 10 ** 18), String(buyOrder.amount * 10 ** 18), true, 255, 255, false);
        let maker = userSigner.createSignedOrder(maker_order);
        console.log(maker);

        let taker_order = new wasm.Order(40, 1, 1, 1, 141, 1, String(buyOrder.price * 10 ** 18), String(buyOrder.amount * 10 ** 18), false, 255, 255, false);
        let taker = zkLinkSigner.createSignedOrder(taker_order);
        console.log(taker);

        let tx_builder = new wasm.OrderMatchingBuilder(40, 1, taker, maker, "405000000000000,", 141, [], [], String(buyOrder.price * 10 ** 18), String(sellOrder.amount * 10 ** 18));
        let order_matching = wasm.newOrderMatching(tx_builder);
        let signature = zkLinkSigner.signOrderMatching(order_matching);
        console.log(signature);

        let submitter_signature = zkLinkSigner.submitterSignature(signature.tx);
        console.log(submitter_signature);
        let rpc_client = new wasm.RpcClient("testnet");
        let tx_hash = await rpc_client.sendTransaction(signature.tx,null,submitter_signature);
        console.log(tx_hash);
    }
  }
}
}
}
