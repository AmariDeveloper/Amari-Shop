import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       selectedVariation: []
}

const productUtilSlice = createSlice({
        name: "productUtils",
        initialState,
        reducers: {
               setSelectedVariation: (state, action) => {
                      state.selectedVariation.push(action.payload)
               },
               removeSelectedVariation: (state, action) => {
                      console.log(action.payload)
                      state.selectedVariation = state.selectedVariation.filter(item => item.name !== action.payload)
               },
               clearSelectedVariation: (state) => {
                      state.selectedVariation = []
               }
        }
})

export const {
       setSelectedVariation,
       removeSelectedVariation,
       clearSelectedVariation
} = productUtilSlice.actions

export default productUtilSlice.reducer