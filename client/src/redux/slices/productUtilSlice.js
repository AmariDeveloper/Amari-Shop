import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       all_products: localStorage.getItem("All Products") ? JSON.parse(localStorage.getItem("All Products")) : [],
       selectedVariation: []
}

const productUtilSlice = createSlice({
        name: "productUtils",
        initialState,
        reducers: {
              setAllProducts: (state, action) => {
                     state.all_products = action.payload;
                     localStorage.setItem("All Products", JSON.stringify(action.payload));
              },





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
       setAllProducts,
       setSelectedVariation,
       removeSelectedVariation,
       clearSelectedVariation
} = productUtilSlice.actions

export default productUtilSlice.reducer