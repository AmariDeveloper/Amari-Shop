import { apiSlice } from "../apiSlice";

export const userSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
              loginUser: builder.mutation({
                     query: (payload) => ({
                           url: "v1/user/login",
                           method: "POST",
                           body: payload
                     })
              })
        })
})

export const { 
    useLoginUserMutation,
} = userSlice