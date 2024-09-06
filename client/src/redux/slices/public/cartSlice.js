import { createSlice} from "@reduxjs/toolkit";

const initialState = {
      shopping_cart: localStorage.getItem("Shopping Cart") ? JSON.parse(localStorage.getItem("Shopping Cart")) : [],
      isSidebarCartOpen: false,
      shipping_fee: localStorage.getItem("Shipping Fee") ? JSON.parse(localStorage.getItem("Shipping Fee")) : null,
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
                        //const isVariationAlreadyInCart = state.shopping_cart.find(item => item._id === action.payload.data._id).variations.find(vr => vr.id === action.payload.item.id);
                        const isProductAlreadyInCart = state.shopping_cart.find(item => item._id === action.payload.data._id);

                        if(isProductAlreadyInCart){
                              //check for pre-existing variations
                              const isVariationExisting = isProductAlreadyInCart.variations.find(vr  => vr.id === action.payload.item.id);
                              if(isVariationExisting){
                                    state.selectedProductVariations.push({ ...isVariationExisting, quantity: isVariationExisting.quantity })
                              }else{
                                    state.selectedProductVariations.push({ ...action.payload.item, quantity: 1})
                              }
                        }else{
                               state.selectedProductVariations.push({...action.payload.item, quantity: 1 })
                        }
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
               incrementVariationQuantityinShoppingCart: (state, action) => {
                      //const currentItem = state.shopping_cart.find(item => item.variations.map(sm => sm._id).includes(action.payload._id))
                      const currentItem = state.shopping_cart.find(item => item._id === action.payload.id)
                      if(currentItem){
                               const currentVar = currentItem.variations.find(item => item.id === action.payload.data.id)
                               currentVar.quantity++;
                            //update parent quantity
                            const sum = currentItem.variations.reduce((acc, curr) => acc + curr.quantity, 0);
                           currentItem.quantity = sum;
                           localStorage.setItem("Shopping Cart", JSON.stringify(state.shopping_cart));
                      }

               },
               decrementVariationQuantityInShoppingCart: (state, action) => {
                    // const currentItem = state.shopping_cart.find(item => item.variations.map(sm => sm._id).includes(action.payload._id))
                     const currentItem = state.shopping_cart.find(item => item._id === action.payload.id);
                     
                     if(currentItem){
                             const currentVar = currentItem.variations.find(item => item.id === action.payload.data.id);
                             if(currentVar.quantity <= 1){
                                     currentVar.quantity = 1
                             }else{
                                   currentVar.quantity--
                             }
                        //update parent quantity
                            const sum = currentItem.variations.reduce((acc, curr) => acc + curr.quantity,0);
                            currentItem.quantity = sum;
                            localStorage.setItem("Shopping Cart", JSON.stringify(state.shopping_cart));
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

               removeVariationFromShoppingCart: (state,action) => {
                      const currentItem = state.shopping_cart.find(item => item._id === action.payload.id);

                      if(currentItem){
                            const filtered = currentItem.variations.filter(item => item.id !== action.payload.data.id);
                            currentItem.variations = filtered;
                            if(currentItem.variations.length <= 0){
                                    state.shopping_cart = state.shopping_cart.filter(item => item._id !== currentItem._id);
                            }
                            currentItem.quantity = currentItem.quantity - action.payload.data.quantity

                            localStorage.setItem("Shopping Cart", JSON.stringify(state.shopping_cart));
                      }
               },

               setShippingFee: (state, action) => {
                       state.shipping_fee = action.payload;
                       localStorage.setItem("Shipping Fee", JSON.stringify(action.payload))
               }
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
    resetVariationQuantityList,
    incrementVariationQuantityinShoppingCart,
    decrementVariationQuantityInShoppingCart,
    removeVariationFromShoppingCart,
    setShippingFee
} = cartSlice.actions

export default cartSlice.reducer