export enum Margin_Type {
    Cross = "Cross",
    Isolated = "Isolated",
}
  
export enum Order_Type {
    Limit = "limit",
    Market = "Market",
}
  
export interface OrderToPlace {
    type: Order_Type;
    price: string;
    stopLossPrice: string;
    takeProfitPrice: string;
    amount: string;
    totalPrice:string;
    isBuyOrder: boolean;
    hasTime: boolean;
    expiration: any;
    leverage: number;
    margin: Margin_Type;
}