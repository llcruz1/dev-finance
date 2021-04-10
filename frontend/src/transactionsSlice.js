import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const transactionsAdapter = createEntityAdapter({
  //selectId: (transaction) => transaction.id,
});

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async () => {
    const response = await axios.get("/transactions");
    return response.data;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (transaction) => {
    const response = await axios.put(
      `/transactions/${transaction.id}`,
      transaction
    );
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
