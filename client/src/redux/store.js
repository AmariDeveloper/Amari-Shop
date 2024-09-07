import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice"
import utilReducer from "./slices/utilSlice"
import clientReducer from "./slices/public/clientSlice"
import productUtilsReducer from "./slices/productUtilSlice"
import cartReducer from "./slices/public/cartSlice"
import billingReducer from "./slices/public/billingSlice"

const store = configureStore({
      reducer: {
             client: clientReducer,
             auth: authReducer,
             utils: utilReducer,
             cart: cartReducer,
             productUtils: productUtilsReducer,
             billing: billingReducer,
             [apiSlice.reducerPath]: apiSlice.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: true
})

setupListeners(store.dispatch);

export default store