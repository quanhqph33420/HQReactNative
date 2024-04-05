import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./reducer/searchReducer";

const store = configureStore({
  reducer: {
    product: searchReducer,
  },
});
export default store;
