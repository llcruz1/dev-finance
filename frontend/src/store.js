import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./transactionsSlice";

const store = configureStore({
  reducer: {
    transactionsList: transactionSlice.reducer,
  },
});

export default store;
