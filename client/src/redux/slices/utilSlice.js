import { createSlice } from "@reduxjs/toolkit"

const initialState = {
        productCollectionType: localStorage.getItem("CollectionType") ? JSON.parse(localStorage.getItem("CollectionType")) : "Grid",
        appNotification: {
                status: false,
                message: "",
                type: ""
        }
}

const utilSlice = createSlice({
       name: "utils",
       initialState,
       reducers: {
              setProductCollectionType: (state, action) => {
                    state.productCollectionType = action.payload;
                    localStorage.setItem("CollectionType", JSON.stringify(action.payload))
              },
             setAppNotification: (state, action) => {
                     state.appNotification.status = action.payload.status;
                     state.appNotification.message = action.payload.message;
                     state.appNotification.type = action.payload.type;
             },
             removeAppNotification: (state) => {
                     state.appNotification.status = false;
             }
       }
})

export const {
       setProductCollectionType,
       setAppNotification,
       removeAppNotification
} = utilSlice.actions;

export default utilSlice.reducer;