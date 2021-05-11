import { configureStore } from "@reduxjs/toolkit";
import equitiesReducer from "./features/equities/EquitiesSlice";
import transactionsReducer from "./features/transactions/TransactionsSlice";

export const store = configureStore({
  reducer: {
    equities: equitiesReducer,
    transactions: transactionsReducer,
  },
});
