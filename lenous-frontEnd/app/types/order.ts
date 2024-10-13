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
    asset: string;
    price: number;
    stopLossPrice: number;
    takeProfitPrice: number;
    amount: number;
    isBuyOrder: boolean;
    hasTime: boolean;
    expiration: any;
    leverage: number;
    margin: Margin_Type;
}