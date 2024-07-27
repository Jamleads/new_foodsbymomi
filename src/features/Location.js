import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import StatusCode from "../utilities/StatusCode";
const initialState = {
  status: "",
  location: {},
  error: null,
};

export const getLocationByIp = createAsyncThunk(
  "getLocationByIp",
  async (_, { rejectWithValue }) => {
    try {
      const ApiKey = "1986eab1d5f14eb3b2968a2e95a09654";
      const response = await axios.get(
        `https://api.geoapify.com/v1/ipinfo?apiKey=${ApiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || error.message || "An error occurred"
      );
    }
  }
);

const locationByIpSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocationByIp.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getLocationByIp.fulfilled, (state, { payload }) => {
        state.location = payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(getLocationByIp.rejected, (state, { payload }) => {
        state.state = StatusCode.ERROR;
        state.error = payload;
      });
  },
});

export default locationByIpSlice.reducer;
