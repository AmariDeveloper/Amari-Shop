import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      shopping_cart: localStorage.getItem("Shopping Cart") ? JSON.parse(localStorage.getItem("Shopping Cart")) : [],
      isSidebarCartOpen: false,
}

const cartSlice = createSlice({
        name: "cart",
        initialState,
        reducers: {
               addProductToShoppingCart: (state, action) => {
                     const isItemInCart = state.shopping_cart.find((item) => item._id === action.payload._id);
                     if(isItemInCart){
                           isItemInCart.quantity++;
                     }else{
                          state.shopping_cart.push({ ...action.payload, quantity: 1})
                     }

                     localStorage.setItem("Shopping Cart", JSON.stringify(state.shopping_cart))
               },
 
               addProductToShoppingCartFromQuickView: (state, action) => {
                     const isItemInCart = state.shopping_cart.find(item => item._id === action.payload.data._id);
                     if(isItemInCart){
                            isItemInCart.quantity = action.payload.quantity;
                     }else{
                          state.shopping_cart.push({...action.payload.data, quantity: action.payload.quantity})
                     }
                     localStorage.setItem("Shopping Cart", JSON.stringify(state.shopping_cart))
               },




               openShoppingCartSidebar: (state) => {
                       state.isSidebarCartOpen = true
               },
               closeShoppingCartSidebar: (state) => {
                     state.isSidebarCartOpen = false
               },
        }
})

export const { 
    addProductToShoppingCart,
    addProductToShoppingCartFromQuickView,
    openShoppingCartSidebar,
    closeShoppingCartSidebar
} = cartSlice.actions

export default cartSlice.reducer