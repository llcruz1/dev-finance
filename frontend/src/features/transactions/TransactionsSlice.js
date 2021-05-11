import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const transactionsAdapter = createEntityAdapter({});

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction) => {
    const response = await axios.post(`api/transactions`, transaction);
    return response.data;
  }
);

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async () => {
    const { data } = await axios.get("api/transactions");

    const transactions = data.map((transaction) => {
      return {
        id: transaction.id,
        ticker: transaction.ticker,
        operationType: transaction.operationType,
        operationDate: new Date(transaction.operationDate).toLocaleDateString(),
        qty: transaction.qty,
        price: transaction.price,
        taxes: transaction.taxes,
      };
    });

    return transactions;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (transaction) => {
    const response = await axios.put(
      `api/transaction/${transaction.id}`,
      transaction
    );
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    const response = await axios.delete(`api/transaction/${id}`);
    return response.data;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [addTransaction.pending]: (state, action) => {
      state.status = "loading";
    },
    [addTransaction.fulfilled]: (state, action) => {
      state.status = "saved";
      transactionsAdapter.addOne(state, action.payload);
    },
    [getTransactions.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.status = "loaded";
      transactionsAdapter.setAll(state, action.payload);
    },
    [getTransactions.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateTransaction.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateTransaction.fulfilled]: (state, action) => {
      state.status = "saved";
      transactionsAdapter.upsertOne(state, action.payload);
    },
    [deleteTransaction.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      state.status = "deleted";
      transactionsAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactionsIds,
  selectEntities: selectTransactionEntities,
  selectTotal: selectTotalTransactions,
} = transactionsAdapter.getSelectors((state) => state.transactions);

export default transactionsSlice.reducer;
