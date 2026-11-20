import { configureStore } from "@reduxjs/toolkit";
import itemListReducer from "./itemListSlice";

const store = configureStore({
    reducer: {
        itemList: itemListReducer
    }
});

export default store;