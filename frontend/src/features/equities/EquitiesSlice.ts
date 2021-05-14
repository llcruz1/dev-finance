import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";

// Types
interface Equity {
  id: string;
  averagePrice: number;
  currentPrice: number;
  equityType: string;
  groupName: string;
  index: string;
  broker: string;
  name: string;
  qty: number;
  ticker: string;
}

interface EquityState extends EntityState<Equity> {
  status: "idle" | "loading" | "loaded" | "failed" | "saved" | "deleted";
  error: any;
}

// Entity Adapter and initial state
const equitiesAdapter = createEntityAdapter<Equity>({});

const initialState: EquityState = equitiesAdapter.getInitialState({
  status: "idle",
  error: null,
});

// API calls
export const addEquity = createAsyncThunk(
  "equities/addEquity",
  async (equity: Equity) => {
    const response = await axios.post(`api/equities`, equity);
    return response.data;
  }
);

export const getEquities = createAsyncThunk(
  "equities/getEquities",
  async () => {
    const { data } = await axios.get("api/equities");

    const equities = data.map((equity: Equity) => {
      return {
        id: equity.id,
        averagePrice: equity.averagePrice.toFixed(2),
        currentPrice: equity.currentPrice.toFixed(2),
        equityType: equity.equityType,
        groupName: equity.groupName,
        index: equity.index,
        broker: equity.broker,
        name: equity.name,
        qty: equity.qty,
        ticker: equity.ticker,
      };
    });

    return equities;
  }
);

export const updateEquity = createAsyncThunk(
  "equities/updateEquity",
  async (equity: Equity) => {
    const response = await axios.put(`api/equity/${equity.id}`, equity);
    return response.data;
  }
);

export const deleteEquity = createAsyncThunk(
  "equities/deleteEquity",
  async (id: String) => {
    const response = await axios.delete(`api/equity/${id}`);
    return response.data;
  }
);

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
