import { createSlice } from "@reduxjs/toolkit";

const connectionslice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addconnections: (state, action) => {
      return action.payload;
    },

  },
});

export const { addconnections } = connectionslice.actions;

export default connectionslice.reducer;
