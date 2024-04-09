import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./reducer/productReducer";
import recentReducer from "./reducer/recentReducer";
import favoriteReducer from "./reducer/favoriteReducer";
import commentReducer from "./reducer/commentReducer";

const store = configureStore({
  reducer: {
    product: searchReducer,
    recent: recentReducer,
    favorite: favoriteReducer,
    comment: commentReducer,
  },
});
export default store;
