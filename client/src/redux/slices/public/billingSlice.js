import { createSlice } from "@reduxjs/toolkit";

const initialState = {
         details: localStorage.getItem("Billing Info") ? JSON.parse(localStorage.getItem("Billing Info")): {},
         order: localStorage.getItem("Order Billing") ? JSON.parse(localStorage.getItem("Order Billing")) : []
}

const billingSlice = createSlice({
       name: "billing",
       initialState,
       reducers: {
              saveBillingInformation: (state, action) => {
                    state.details = {...action.payload}
                    localStorage.setItem("Billing Info", JSON.stringify(action.payload))
              },
             
              saveOrderInformation: (state, action) => {
                      state.order = action.payload
                      localStorage.setItem("Order Billing", JSON.stringify(action.payload))
              },
       }
})

export const {
       saveBillingInformation,
       saveOrderInformation
} = billingSlice.actions

export default billingSlice.reducer;