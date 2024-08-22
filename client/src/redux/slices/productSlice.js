import { apiSlice } from "../apiSlice";

export const productSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
            //Create product
              createNewProduct: builder.mutation({
                     query: (payload) => ({
                            url: "/v1/product/create-new-product",
                             method: "POST",
                            body: payload
                     }),
                     invalidatesTags: ['Products']
               }),
               //Edit product
              editProduct: builder.mutation({
                     query: (payload) => ({
                            url: "v1/product/edit-product",
                            method: "PUT",
                            body: payload
                     }),
                     invalidatesTags: ["Products"]
              }),

               //Get all products
               getCreatedProducts: builder.query({
                     query: () => ({
                               url: "v1/product/get-all-products",
                               method: "GET",
                     }),
                     providesTags: ["Products"]
               }),

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
               }),
               createVariation: builder.mutation({
                     query: (payload) => ({
                             url: "/v1/product/create-variation",
                             method: "POST",
                             body: payload
                     }),
                     invalidatesTags: ["Variation"]
               }),
               getAllVariations: builder.query({
                       query: () => ({
                              url: "/v1/product/get-all-variations",
                              method: "GET"
                       }),
                       providesTags: ["Variation"]
               }),
               editVariation: builder.mutation({
                      query: (payload) => ({
                            url: "/v1/product/edit-variation",
                            method: "PUT",
                            body: payload
                      }),
                      invalidatesTags: ["Variation"]
               }),
               deleteVariation: builder.mutation({
                     query: (payload) => ({
                             url: "/v1/product/delete-variation",
                             method: "DELETE",
                             body: payload
                     }),
                     invalidatesTags: ['Variation']
               }),
       })
})

export const {
       useCreateNewProductMutation,
       useEditProductMutation,


      useGetCreatedProductsQuery,
      useCreateCategoryMutation,
      useGetCategoriesQuery,
      useDeleteCategoryMutation,
      useEditCategoryMutation,
      useCreateVariationMutation,
      useGetAllVariationsQuery,
      useDeleteVariationMutation,
      useEditVariationMutation,
} = productSlice