import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const equitiesAdapter = createEntityAdapter({});

export const addEquity = createAsyncThunk(
  "equities/addEquity",
  async (equity) => {
    const response = await axios.post(`api/equities`, equity);
    return response.data;
  }
);

export const getEquities = createAsyncThunk(
  "equities/getEquities",
  async () => {
    const response = await axios.get("api/equities");
    return response.data;
  }
);

export const updateEquity = createAsyncThunk(
  "equities/updateEquity",
  async (equity) => {
    const response = await axios.put(`api/equity/${equity.id}`, equity);
    return response.data;
  }
);

export const deleteEquity = createAsyncThunk(
  "equities/deleteEquity",
  async (id) => {
    const response = await axios.delete(`api/equity/${id}`);
    return response.data;
  }
);

export const equitiesSlice = createSlice({
  name: "equities",
  initialState: equitiesAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [addEquity.pending]: (state, action) => {
      state.status = "loading";
    },
    [addEquity.fulfilled]: (state, action) => {
      state.status = "saved";
      equitiesAdapter.addOne(state, action.payload);
    },
    [getEquities.pending]: (state, action) => {
      state.status = "loading";
    },
    [getEquities.fulfilled]: (state, action) => {
      state.status = "loaded";
      equitiesAdapter.setAll(state, action.payload);
    },
    [getEquities.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateEquity.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateEquity.fulfilled]: (state, action) => {
      state.status = "saved";
      equitiesAdapter.upsertOne(state, action.payload);
    },
    [deleteEquity.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteEquity.fulfilled]: (state, action) => {
      state.status = "deleted";
      equitiesAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  selectAll: selectAllEquities,
  selectById: selectEquityById,
  selectIds: selectEquitiesIds,
  selectEntities: selectEquityEntities,
  selectTotal: selectTotalEquities,
} = equitiesAdapter.getSelectors((state) => state.equities);

export default equitiesSlice.reducer;
