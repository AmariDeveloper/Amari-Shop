import { createSlice } from "@reduxjs/toolkit";

const initialState = {
         details: localStorage.getItem("Billing Info") ? JSON.parse(localStorage.getItem("Billing Info")): {}
}

const billingSlice = createSlice({
       name: "billing",
       initialState,
       reducers: {
              saveBillingInformation: (state, action) => {
                    state.details = {...action.payload}
                    localStorage.setItem("Billing Info", JSON.stringify(action.payload))
              }
       }
})

export const {
       saveBillingInformation
} = billingSlice.actions

export default billingSlice.reducer;