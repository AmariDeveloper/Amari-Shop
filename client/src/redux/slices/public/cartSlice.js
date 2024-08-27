import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      shopping_cart: [],
      isSidebarCartOpen: false,
      cartTotal: 0
}

const cartSlice = createSlice({
        name: "Cart",
})

export const { } = cartSlice.actions