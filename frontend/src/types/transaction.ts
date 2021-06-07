export interface Transaction {
  id: string;
  ticker: string;
  market: string;
  formattedMarket?: string;
  broker: string;
  operationType: string;
  formattedOperationType?: string;
  operationDate: string;
  formattedOperationDate?: string;
  qty: number;
  price: number;
  taxes: number;
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
