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
                }),






                //Customer Auth
                registerNewCustomerManually: builder.mutation({
                         query: (payload) => ({
                                 url: "v1/client/register-customer-manually",
                                 method: "POST",
                                 body: payload
                         })
                })
        })
})

export const {
       useGetAllPublishedProductsQuery,
       useRegisterNewCustomerManuallyMutation
} = clientActionSlice