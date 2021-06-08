export interface Equity {
  id: string;
  averagePrice: number;
  averagePriceAsCurrencyString?: string;
  currentPrice: number;
  currentPriceAsCurrencyString?: string;
  profitAsPercentage: number;
  profitAsCurrency: number;
  profitAsCurrencyString?: string;
  groupName: string;
  market: string;
  broker: string;
  name: string;
  qty: number;
  ticker: string;
}
