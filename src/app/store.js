import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookReducer from "../features/bookSlice";

const rootReducer = combineReducers({
  book: bookReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
