import { taskService } from "./taskService";

export const auth = taskService.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/users/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tasks"],
        }),
        signupUser: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tasks"],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
            invalidatesTags: ["Tasks"],
        }),
    })
})

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = auth;