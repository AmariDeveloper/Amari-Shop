import { createSlice} from "@reduxjs/toolkit";

const initialState = {
      shopping_cart: localStorage.getItem("Shopping Cart") ? JSON.parse(localStorage.getItem("Shopping Cart")) : [],
      isSidebarCartOpen: false,
      selectedProductVariations: []
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

               addProductToShoppingCartFromProductPage: (state, action) => {
                       const isItemInCart = state.shopping_cart.find(item => item._id === action.payload.data._id);
                       if(isItemInCart){
                              isItemInCart.quantity = action.payload.quantity,
                              isItemInCart.variations = action.payload.variations
                       }else{
                              state.shopping_cart.push({ ...action.payload.data, quantity: action.payload.quantity, variations: action.payload.variations })
                       }           
                       localStorage.setItem("Shopping Cart", JSON.stringify(state.shopping_cart))
               },
               removeProductFromShoppingCart: (state, action) => {
                     const filtered = state.shopping_cart.filter(item => item._id !== action.payload);
                     state.shopping_cart = filtered;
                     localStorage.setItem("Shopping Cart", JSON.stringify(filtered));
               },



               //update selectedvariations
               addVariationToCartList: (state, action) => {
                        state.selectedProductVariations.push({ ...action.payload, quantity: 1})
                },
                removeVariationFromCartList: (state, action) => {
                        const filtered = state.selectedProductVariations.filter(item => item.id !== action.payload);
                        state.selectedProductVariations = filtered;
                },
               incrementVariationQuantityInCartList: (state, action) => {
                      const currentItem = state.selectedProductVariations.find(item => item.id === action.payload.id)
                      if(currentItem){
                             currentItem.quantity++
                      }
               },
               decrementVariationQuantityInCartList: (state, action) => {
                      const currentItem = state.selectedProductVariations.find(item => item.id === action.payload.id);

                      if(currentItem){
                              if(currentItem.quantity <= 1){
                                     currentItem.quantity = 1
                              }else{
                                     currentItem.quantity--;
                              }
                      }
               },
              resetVariationQuantityList: (state) => {
                        state.selectedProductVariations = []
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
    addProductToShoppingCartFromProductPage,
    removeProductFromShoppingCart,
    openShoppingCartSidebar,
    closeShoppingCartSidebar,
    addVariationToCartList,
    removeVariationFromCartList,
    incrementVariationQuantityInCartList,
    decrementVariationQuantityInCartList,
    resetVariationQuantityList
} = cartSlice.actions

export default cartSlice.reducer