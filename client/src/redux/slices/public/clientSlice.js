import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       all_published_products: localStorage.getItem("All Published Products") ? JSON.parse(localStorage.getItem("All Published Products")) : [],
       quick_view_modal: { status: false, data: null},
       redirect: "/",
       session: localStorage.getItem("Session") ? JSON.parse(localStorage.getItem("Session")) : { isLoggedIn: false, profile: null }
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
                    state.redirect = "/"
               },
               setCustomerSession: (state, action) => {
                      state.session.isLoggedIn = true;
                      state.session.profile = {...action.payload};
                      localStorage.setItem("Session", JSON.stringify(state.session))
               },
               clearCustomerSession: (state) => {
                      state.session.isLoggedIn = false;
                      state.session.profile = null;
                      localStorage.removeItem("Session");
               }

          }
})

export const {
        setAllPublishedProducts,
        openQuickViewModal,
        closeQuickViewModal,
        saveRedirect,
        clearRedirect,
        setCustomerSession,
        clearCustomerSession
} = clientSlice.actions

export default clientSlice.reducer;