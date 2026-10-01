import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addrequests: (state, action) => {
      return action.payload;
    },
  },
});

export const { addrequests } = requestslice.actions;

export default requestslice.reducer;
