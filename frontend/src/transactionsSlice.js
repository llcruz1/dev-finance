import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const transactionsAdapter = createEntityAdapter({
  selectId: (transaction) => transaction._id.$oid,
});

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async () => {
    const response = await axios.get("/transactions");
    console.log(response.data);
    return response.data;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionsAdapter.getInitialState({
    status: "not_loaded",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [getTransactions.fulfilled]: (state, action) => {
      state.status = "loaded";
      transactionsAdapter.setAll(state, action.payload);
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
