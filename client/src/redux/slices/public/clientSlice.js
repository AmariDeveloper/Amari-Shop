import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       all_published_products: localStorage.getItem("All Published Products") ? JSON.parse(localStorage.getItem("All Published Products")) : []
}

const clientSlice = createSlice({
          name: "client",
          initialState,
          reducers: {
                setAllPublishedProducts: (state, action) => {
                        state.all_published_products = action.payload;
                        localStorage.setItem("All Published Products", JSON.stringify(action.payload))
                }
          }
})

export const {
        setAllPublishedProducts
} = clientSlice.actions

export default clientSlice.reducer;