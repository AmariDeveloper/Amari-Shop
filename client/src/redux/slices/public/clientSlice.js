import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       all_published_products: localStorage.getItem("All Published Products") ? JSON.parse(localStorage.getItem("All Published Products")) : [],
       quick_view_modal: { status: false, data: null},
       redirect: ""
}

const clientSlice = createSlice({
          name: "client",
          initialState,
          reducers: {
                setAllPublishedProducts: (state, action) => {
                        state.all_published_products = action.payload;
                        localStorage.setItem("All Published Products", JSON.stringify(action.payload))
                },
               openQuickViewModal: (state, action) => {
                      state.quick_view_modal.status = true;
                      state.quick_view_modal.data = action.payload;
               },
               closeQuickViewModal: (state) => {
                     state.quick_view_modal.status = false;
                     state.quick_view_modal.data = null
               },
               saveRedirect: (state, action) => {
                      state.redirect = action.payload
               },
               clearRedirect: (state) => {
                    state.redirect = ""
               } 
          }
})

export const {
        setAllPublishedProducts,
        openQuickViewModal,
        closeQuickViewModal,
        saveRedirect,
        clearRedirect
} = clientSlice.actions

export default clientSlice.reducer;