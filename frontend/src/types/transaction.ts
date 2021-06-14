export interface Transaction {
  id: string;
  ticker: string;
  market: string;
  broker: string;
  operationType: string;
  formattedOperationType?: string;
  operationDate: any;
  formattedOperationDate?: string;
  qty: number;
  price: number;
  priceAsCurrencyString?: string;
  taxes: number;
  taxesAsCurrencyString?: string;
}

export interface TransactionFormInput {
  ticker: string;
  market: string;
  broker: string;
  operationType: string;
  operationDate: string;
  qty: number;
  price: number;
  taxes: number;
}
