import { apiSlice } from "../../apiSlice";

export const clientActionSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
                //get all products
                getAllPublishedProducts: builder.query({
                       query: () => ({
                               url: "v1/client/get-all-published-products",
                               method: "GET",
                       }),
                       providesTags: ["Products"]
                })
        })
})

export const {
       useGetAllPublishedProductsQuery
} = clientActionSlice