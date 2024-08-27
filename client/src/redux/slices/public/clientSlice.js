import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       all_published_products: localStorage.getItem("All Published Products") ? JSON.parse(localStorage.getItem("All Published Products")) : [],
       quick_view_modal: { status: false, data: null},
       shopping_cart: {
              cartTotal: localStorage.getItem("Cart Total") ? JSON.parse(localStorage.getItem("Cart Total")) : 0,
              cartBasket: [{ product: null, order_number: 1}]
       }
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
               addProductToShoppingCart: (state, action) => {
                     state.shopping_cart.cartTotal  = state.shopping_cart.cartTotal++;
                     
                     state.shopping_cart.cartBasket = [...state.shopping_cart.cartBasket, action.payload]
               },
               removeProductFromShoppingCart: (state, action) => {
                   state.shopping_cart.cartTotal  = state.shopping_cart.cartTotal--;
                   state.shopping_cart.cartBasket = state.shopping_cart.cartBasket.filter(item => item.product._id !== action.payload);
               }
          }
})

export const {
        setAllPublishedProducts,
        openQuickViewModal,
        closeQuickViewModal,
        addProductToShoppingCart,
        removeProductFromShoppingCart
} = clientSlice.actions

export default clientSlice.reducer;