import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice"
import utilReducer from "./slices/utilSlice"
import clientReducer from "./slices/public/clientSlice"
import productUtilsReducer from "./slices/productUtilSlice"

const store = configureStore({
      reducer: {
             client: clientReducer,
             auth: authReducer,
             utils: utilReducer,
             productUtils: productUtilsReducer,
             [apiSlice.reducerPath]: apiSlice.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: true
})

setupListeners(store.dispatch);

export default store