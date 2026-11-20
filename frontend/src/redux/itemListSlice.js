
import { createSlice } from "@reduxjs/toolkit";

const itemListSlice = createSlice({
    name: "itemList",
    initialState: [],

    reducers: {
        itemsFromServer: (state, action) => {
            if (Array.isArray(action.payload)) {
                return action.payload;
            }

            if (Array.isArray(action.payload?.items)) {
                return action.payload.items;
            }

            return [];
        },

        removeItem: (state, action) => {
            return state.filter(
                item => item._id !== action.payload.pid
            );
        }
    }
});

export const { itemsFromServer, removeItem } = itemListSlice.actions;

export default itemListSlice.reducer;
