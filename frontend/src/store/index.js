import {configureStore, createSlice} from '@reduxjs/toolkit';
import itemListSlice from './itemList';
import bagItemsSlice from './bagItems';
import isAdminSlice from './isAdmin';
import wishlistItemsSlice from './wishlistItems';

export const myStore= configureStore({
    reducer:{
        itemList:itemListSlice.reducer,
        bagItemIds:bagItemsSlice.reducer,
        isAdmin:isAdminSlice.reducer,
        wishlistItems:wishlistItemsSlice.reducer,
    }
}) 

export const itemListActions= itemListSlice.actions;
export const bagItemsActions= bagItemsSlice.actions;
export const isAdminActions= isAdminSlice.actions;
export const wishlistItemsActions = wishlistItemsSlice.actions;