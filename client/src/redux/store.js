import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice"
import utilReducer from "./slices/utilSlice"

const store = configureStore({
      reducer: {
             auth: authReducer,
             utils: utilReducer,
             [apiSlice.reducerPath]: apiSlice.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: true
})

setupListeners(store.dispatch);

export default store