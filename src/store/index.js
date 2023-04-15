import { configureStore } from "@reduxjs/toolkit";
import allcity from "./AllCity";
const store = configureStore({
  reducer: {
    allcity,
  },
});
export default store;
