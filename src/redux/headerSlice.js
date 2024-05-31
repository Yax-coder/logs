import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    dynamicHeaders: {},
  },
  reducers: {
    setHeaders: (state, action) => {
      state.dynamicHeaders = action.payload;
    },
  },
});

export const { setHeaders } = headerSlice.actions;
export default headerSlice.reducer;
