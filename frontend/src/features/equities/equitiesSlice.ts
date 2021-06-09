import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { api } from "../../services/api";
import { Equity } from "../../types/equity";
import setCurrency from "../../utils/setCurrency";

// Types
interface EquityState extends EntityState<Equity> {
  status: "idle" | "loading" | "loaded" | "failed" | "saved" | "deleted" | "refreshed";
  error: any;
}

// Entity Adapter and initial state
const equitiesAdapter = createEntityAdapter<Equity>({});

const initialState: EquityState = equitiesAdapter.getInitialState({
  status: "idle",
  error: null,
});

// API calls
export const addEquity = createAsyncThunk("equities/addEquity", async (equity: Equity) => {
  const response = await api.post(`api/equities`, equity);
  return response.data;
});

export const getEquities = createAsyncThunk("equities/getEquities", async () => {
  const { data } = await api.get("api/equities");

  const equities = data.map((equity: Equity) => {
    return {
      id: equity.id,
      averagePrice: equity.averagePrice.toFixed(2),
      averagePriceAsCurrencyString:
        setCurrency(equity.market) + " " + String(equity.averagePrice.toFixed(2)),
      currentPrice: equity.currentPrice.toFixed(2),
      currentPriceAsCurrencyString:
        setCurrency(equity.market) + " " + String(equity.currentPrice.toFixed(2)),
      profitAsPercentage: Number(
        (((equity.currentPrice - equity.averagePrice) / equity.currentPrice) * 100).toFixed(2),
      ),
      profitAsCurrency: Number(
        ((equity.currentPrice - equity.averagePrice) * equity.qty).toFixed(2),
      ),
      profitAsCurrencyString:
        setCurrency(equity.market) +
        " " +
        String(((equity.currentPrice - equity.averagePrice) * equity.qty).toFixed(2)),
      groupName: equity.groupName,
      market: equity.market,
      broker: equity.broker,
      name: equity.name,
      qty: equity.qty,
      totalInvested: equity.averagePrice * equity.qty,
      totalInvestedAsCurrencyString:
        setCurrency(equity.market) + " " + String((equity.averagePrice * equity.qty).toFixed(2)),
      currentTotal: equity.currentPrice * equity.qty,
      currentTotalAsCurrencyString:
        setCurrency(equity.market) + " " + String((equity.currentPrice * equity.qty).toFixed(2)),
      ticker: equity.ticker.toUpperCase(),
    };
  });

  return equities;
});

export const getEquityById = createAsyncThunk("equities/getEquityById", async (id: string) => {
  const { data } = await api.get(`api/equity/${id}`);

  const equity = {
    id: data.id,
    averagePrice: data.averagePrice.toFixed(2),
    averagePriceAsCurrencyString:
      setCurrency(data.market) + " " + String(data.averagePrice.toFixed(2)),
    currentPrice: data.currentPrice.toFixed(2),
    currentPriceAsCurrencyString:
      setCurrency(data.market) + " " + String(data.currentPrice.toFixed(2)),
    profitAsPercentage: Number(
      (((data.currentPrice - data.averagePrice) / data.currentPrice) * 100).toFixed(2),
    ),
    profitAsCurrency: Number(((data.currentPrice - data.averagePrice) * data.qty).toFixed(2)),
    profitAsCurrencyString:
      setCurrency(data.market) +
      " " +
      String(((data.currentPrice - data.averagePrice) * data.qty).toFixed(2)),
    equityType: data.equityType,
    groupName: data.groupName,
    market: data.market,
    broker: data.broker,
    name: data.name,
    qty: data.qty,
    totalInvested: data.averagePrice * data.qty,
    totalInvestedAsCurrencyString:
      setCurrency(data.market) + " " + String((data.averagePrice * data.qty).toFixed(2)),
    currentTotal: data.currentPrice * data.qty,
    currentTotalAsCurrencyString:
      setCurrency(data.market) + " " + String((data.currentPrice * data.qty).toFixed(2)),
    ticker: data.ticker.toUpperCase(),
  };

  return equity;
});

export const updateEquity = createAsyncThunk("equities/updateEquity", async (equity: Equity) => {
  const response = await api.put(`api/equity/${equity.id}`, equity);
  return response.data;
});

export const deleteEquity = createAsyncThunk("equities/deleteEquity", async (id: String) => {
  const response = await api.delete(`api/equity/${id}`);
  return response.data;
});

// Slice logic
export const equitiesSlice = createSlice({
  name: "equities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEquity.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addEquity.fulfilled, (state, action) => {
      state.status = "saved";
      equitiesAdapter.addOne(state, action.payload);
    });
    builder.addCase(getEquities.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getEquities.fulfilled, (state, action) => {
      state.status = "loaded";
      equitiesAdapter.setAll(state, action.payload);
    });
    builder.addCase(getEquities.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //
    builder.addCase(getEquityById.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getEquityById.fulfilled, (state, action) => {
      state.status = "refreshed";
      equitiesAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(getEquityById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //
    builder.addCase(updateEquity.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateEquity.fulfilled, (state, action) => {
      state.status = "saved";
      equitiesAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(deleteEquity.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteEquity.fulfilled, (state, action) => {
      state.status = "deleted";
      equitiesAdapter.removeOne(state, action.payload);
    });
  },
});

// Selectors
export const {
  selectAll: selectAllEquities,
  selectById: selectEquityById,
  selectIds: selectEquitiesIds,
  selectEntities: selectEquityEntities,
  selectTotal: selectTotalEquities,
} = equitiesAdapter.getSelectors<RootState>((state) => state.equities);

export default equitiesSlice.reducer;
