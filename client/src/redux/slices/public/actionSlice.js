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
                loginCustomerManually: builder.mutation({
                       query: (payload) => ({
                               url: "v1/client/customer-login",
                               method: "POST",
                               body: payload
                       })
                }),

                registerNewCustomerManually: builder.mutation({
                         query: (payload) => ({
                                 url: "v1/client/register-customer-manually",
                                 method: "POST",
                                 body: payload
                         })
                }),

                logoutCustomer: builder.mutation({
                        query: () => ({
                                url: "v1/client/customer-logout",
                                method: "POST"
                        })
                }),

                //Register new Supplier or Business
                registerNewBusiness: builder.mutation({
                        query: (payload) => ({
                                url: "v1/client/register-new-business",
                                method: "POST",
                                body: payload
                        })
                }),


                //process payments for customers
                processPayments: builder.mutation({
                         query: (payload) => ({
                                  url: "v1/client/process-payment",
                                  method: "POST",
                                  body: payload
                         })
                })
        })
})

export const {
       useGetAllPublishedProductsQuery,
       useRegisterNewCustomerManuallyMutation,
       useRegisterNewBusinessMutation,
       useLoginCustomerManuallyMutation,
       useLogoutCustomerMutation,
       useProcessPaymentsMutation
} = clientActionSlice