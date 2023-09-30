import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { map } from 'rxjs';

@Injectable()
export class SyncserviceService {
  requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  constructor(private readonly httpService: HttpService) {}

  getAccount(address: string) {
    
    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "getAccount",
      "params": [
          address
      ]
    }
    return this.httpService.post("https://aws-gw-v2.zk.link", payload, this.requestConfig).pipe(
      map(resp => resp.data)
    )
  }

  getAccountBalance(addcountId: string) {
    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "getAccountBalances",
      "params": [
          +addcountId,
          4 //always the #x sub-account, x depends on which sub-account our app want to use
      ]
    }
    return this.httpService.post("https://aws-gw-v2.zk.link", payload, this.requestConfig).pipe(
      map(resp => resp.data)
    )
  }

  getAccountOrderAndSlot(addcountId: string) {
    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "getAccountOrderSlots",
      "params": [
          +addcountId,
          4 //always the #x sub-account, x depends on which sub-account our app want to use
      ]
    }
    return this.httpService.post("https://aws-gw-v2.zk.link", payload, this.requestConfig).pipe(
      map(resp => resp.data)
    )
  }

  getAccountBlockHeightData(addcountaddress: string, subaccountId: string, blockHeight: string) {
    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "getAccountSnapshot",
      "params": [
          addcountaddress,
          subaccountId,
          blockHeight
      ]
    }
    return this.httpService.post("https://aws-gw-v2.zk.link", payload, this.requestConfig).pipe(
      map(resp => resp.data)
    )
  }

  getTransactionDetail(txHash: string, stateChange: boolean) {
    const payload = {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "getTransactionByHash",
      "params": [
        txHash,
        stateChange
      ]
    }
    return this.httpService.post("https://aws-gw-v2.zk.link", payload, this.requestConfig).pipe(
      map(resp => resp.data)
    )
  }

}
