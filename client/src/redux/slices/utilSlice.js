import { createSlice } from "@reduxjs/toolkit"

const initialState = {
        productCollectionType: localStorage.getItem("CollectionType") ? JSON.parse(localStorage.getItem("CollectionType")) : "Grid"
}

const utilSlice = createSlice({
       name: "utils",
       initialState,
       reducers: {
              setProductCollectionType: (state, action) => {
                    state.productCollectionType = action.payload;
                    localStorage.setItem("CollectionType", JSON.stringify(action.payload))
              }
       }
})

export const {
       setProductCollectionType
} = utilSlice.actions;

export default utilSlice.reducer;