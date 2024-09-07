import { createSlice } from "@reduxjs/toolkit";

const initialState = {
         billing: localStorage.getItem("Billing Info") ? JSON.parse(localStorage.getItem("Billing Info")): {}
}

const billingSlice = createSlice({
       name: "billing",
       initialState,
       reducers: {
              saveBillingInformation: (state, action) => {
                    state.billing = action.payload
              }
       }
})

export const {
       saveBillingInformation
} = billingSlice.actions

export default billingSlice.reducer;