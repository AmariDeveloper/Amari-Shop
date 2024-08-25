import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       categories: localStorage.getItem("")
}

const clientSlice = createSlice({
          name: "client",
          initialState,
          reducers: {

          }
})

export const {
        set
} = clientSlice.actions

export default clientSlice.reducer;