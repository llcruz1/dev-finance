import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { api } from "../../services/api";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

// Types
interface Transaction {
  id: string;
  ticker: string;
  market: string;
  broker: string;
  operationType: string;
  operationDate: string;
  qty: number;
  price: number;
  taxes: number;
}

interface AddTransaction {
  ticker: string;
  market: string;
  broker: string;
  operationType: string;
  operationDate: string;
  qty: number;
  price: number;
  taxes: number;
}

interface TransactionState extends EntityState<Transaction> {
  status: "idle" | "loading" | "loaded" | "failed" | "saved" | "deleted" | "refreshed";
  error: any;
}

// Entity Adapter and initial state
const transactionsAdapter = createEntityAdapter<Transaction>({});

const initialState: TransactionState = transactionsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// API calls
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: AddTransaction) => {
    const response = await api.post(`api/transactions`, transaction);
    return response.data;
  },
);

export const getTransactions = createAsyncThunk("transactions/getTransactions", async () => {
  const { data } = await api.get("api/transactions");

  const transactions = data.map((transaction: Transaction) => {
    return {
      id: transaction.id,
      ticker: transaction.ticker,
      market: transaction.market,
      broker: transaction.broker,
      operationType: transaction.operationType,
      operationDate: format(parseISO(transaction.operationDate), "dd/MM/yyyy", {
        locale: ptBR,
      }),
      qty: transaction.qty,
      price: transaction.price.toFixed(2),
      taxes: transaction.taxes.toFixed(2),
    };
  });

  return transactions;
});

export const getTransactionById = createAsyncThunk(
  "transaction/getTransactionById",
  async (id: string) => {
    const { data } = await api.get(`api/transaction/${id}`);

    const transaction = {
      id: data.id,
      ticker: data.ticker,
      market: data.market,
      broker: data.broker,
      operationType: data.operationType,
      operationDate: format(parseISO(data.operationDate), "yyyy-MM-dd"),
      qty: data.qty,
      price: data.price.toFixed(2),
      taxes: data.taxes.toFixed(2),
    };

    return transaction;
  },
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (transaction: Transaction) => {
    const response = await api.put(`api/transaction/${transaction.id}`, transaction);
    return response.data;
  },
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: String) => {
    const response = await api.delete(`api/transaction/${id}`);
    return response.data;
  },
);

// Slice logic
export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTransaction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.status = "saved";
      transactionsAdapter.addOne(state, action.payload);
    });
    builder.addCase(getTransactions.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.status = "loaded";
      transactionsAdapter.setAll(state, action.payload);
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getTransactionById.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getTransactionById.fulfilled, (state, action) => {
      state.status = "refreshed";
      transactionsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(getTransactionById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateTransaction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.status = "saved";
      transactionsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(deleteTransaction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.status = "deleted";
      transactionsAdapter.removeOne(state, action.payload);
    });
  },
});

// Selectors
export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactionsIds,
  selectEntities: selectTransactionEntities,
  selectTotal: selectTotalTransactions,
} = transactionsAdapter.getSelectors<RootState>((state) => state.transactions);

export default transactionsSlice.reducer;
