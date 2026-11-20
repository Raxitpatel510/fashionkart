import { createSlice } from "@reduxjs/toolkit";

const itemListSlice = createSlice({
  name: "itemList",
  initialState: [],
  reducers: {
    itemsFromServer: (state, action) => {
      return Array.isArray(action.payload)
        ? action.payload
        : Array.isArray(action.payload?.items)
        ? action.payload.items
        : [];
    },

    removeItem: (state, action) => {
      return state.filter(
        (item) => item._id !== action.payload.pid
      );
    },
  },
});

export default itemListSlice;