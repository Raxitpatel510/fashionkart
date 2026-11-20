import { createSlice } from "@reduxjs/toolkit";

const wishlistItemsSlice = createSlice({
  name: "wishlistItems",
  initialState: [],
  reducers: {
    wishlistLoadedFromServer: (state, action) =>
      Array.isArray(action.payload.wishlistItems)
        ? action.payload.wishlistItems
        : [],
    addToWishlist: (state, action) =>
      state.includes(action.payload.itemId)
        ? state
        : [...state, action.payload.itemId],
    removeFromWishlist: (state, action) =>
      state.filter((itemId) => itemId !== action.payload.itemId),
  },
});

export default wishlistItemsSlice;
