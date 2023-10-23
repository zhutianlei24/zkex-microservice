export interface Order {
    price: number,
    amount: number
}

export class GlobalService{ 
    static buyOrders: Order[] = [{price: 1500, amount: 1}, {price: 1498, amount: 1}, {price: 1496, amount: 1}, {price: 1494, amount: 1}, {price: 1492, amount: 1}, {price: 1490, amount: 1}]
    static sellOrders: Order[] = [{price: 1502, amount: 1}, {price: 1504, amount: 1}, {price: 1506, amount: 1}, {price: 1508, amount: 1}, {price: 1510, amount: 1}, {price: 1512, amount: 1}]
 }