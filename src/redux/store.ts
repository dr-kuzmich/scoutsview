import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducers/apiReducer";
import ttaReducer from "./reducers/ttaReducer";

const store = configureStore({
  reducer: {
    api: apiReducer,
    tta: ttaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
