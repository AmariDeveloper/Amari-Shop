import { apiSlice } from "../apiSlice";

export const userSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
              loginUser: builder.mutation({
                     query: (payload) => ({
                           url: "v1/user/login",
                           method: "POST",
                           body: payload
                     })
              }),
              getUserProfile: builder.query({
                      query: () => ({
                              url: "v1/user/user-profile",
                              method: "GET",
                      })
              }),
              updateUserProfile: builder.mutation({
                      query: (payload) => ({
                              url: "v1/user/update-user-profile",
                              method: "POST",
                              body: payload
                      })
              })
        })
})

export const { 
    useLoginUserMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = userSlice