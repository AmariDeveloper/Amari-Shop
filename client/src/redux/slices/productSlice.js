import { apiSlice } from "../apiSlice";

export const productSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
               createCategory: builder.mutation({
                      query: (payload) => ({
                               url: "v1/product/create-new-category",
                               method: "POST",
                               body: payload
                      })
               })
       })
})

export const {
      useCreateCategoryMutation
} = productSlice