export interface Equity {
  id: string;
  averagePrice: number;
  currentPrice: number;
  profit: number;
  groupName: string;
  market: string;
  formattedMarket?: string;
  broker: string;
  name: string;
  qty: number;
  ticker: string;
}
