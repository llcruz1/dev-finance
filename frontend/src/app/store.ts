import { configureStore } from "@reduxjs/toolkit";
import equitiesReducer from "../features/equities/EquitiesSlice";
import transactionsReducer from "../features/transactions/TransactionsSlice";

export const store = configureStore({
  reducer: {
    equities: equitiesReducer,
    transactions: transactionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
