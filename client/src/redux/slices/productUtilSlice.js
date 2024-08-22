import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       all_products: localStorage.getItem("All Products") ? JSON.parse(localStorage.getItem("All Products")) : [],
       selectedVariation: [],
       editProductModal: {status: false, data: null}
}

const productUtilSlice = createSlice({
        name: "productUtils",
        initialState,
        reducers: {
              setAllProducts: (state, action) => {
                     state.all_products = action.payload;
                     localStorage.setItem("All Products", JSON.stringify(action.payload));
              },
              openEditProductModal: (state, action) => {
                     state.editProductModal.status = true;
                     state.editProductModal.data = action.payload
              },
              closeEditProductModal: (state) => {
                     state.editProductModal.status = false;
                     state.editProductModal.data = null
              },



               setSelectedVariation: (state, action) => {
                      state.selectedVariation.push(action.payload)
               },
               setExistingSelectedVariation: (state, action) => {
                      state.selectedVariation = action.payload;
               },
               removeSelectedVariation: (state, action) => {
                      state.selectedVariation = state.selectedVariation.filter(item => item.name !== action.payload)
               },
               clearSelectedVariation: (state) => {
                      state.selectedVariation = []
               }
        }
})

export const {
       setAllProducts,
       openEditProductModal,
       closeEditProductModal,
       setSelectedVariation,
       setExistingSelectedVariation,
       removeSelectedVariation,
       clearSelectedVariation
} = productUtilSlice.actions

export default productUtilSlice.reducer