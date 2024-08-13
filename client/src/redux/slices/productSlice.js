import { apiSlice } from "../apiSlice";

export const productSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
               createCategory: builder.mutation({
                      query: (payload) => ({
                               url: "v1/product/create-new-category",
                               method: "POST",
                               body: payload
                      }),
                      invalidatesTags: ["Categories"]
               }),
               getCategories: builder.query({
                      query: () => ({
                             url: "v1/product/get-all-categories",
                             method: "GET"
                      }),
                      providesTags: ["Categories"]
               }),
               deleteCategory: builder.mutation({
                      query: (payload) => ({
                            url: "v1/product/delete-category",
                            method: "DELETE",
                            body: payload
                      }),
                      invalidatesTags: ['Categories']
               }),
               editCategory: builder.mutation({
                       query: (payload) => ({
                               url: "v1/product/edit-category",
                               method: "PUT",
                               body: payload
                       }),
                       invalidatesTags: ["Categories"]
               })
       })
})

export const {
      useCreateCategoryMutation,
      useGetCategoriesQuery,
      useDeleteCategoryMutation,
      useEditCategoryMutation
} = productSlice