import { configureStore } from "@reduxjs/toolkit";
import ttaReducer from "./reducers/matchReducer";

const store = configureStore({
  reducer: {
    tta: ttaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
