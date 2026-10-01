import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addtofeed: (state, action) => {
      return action.payload;
    },

    removefromfeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addtofeed, removefromfeed } = feedslice.actions;

export default feedslice.reducer;
