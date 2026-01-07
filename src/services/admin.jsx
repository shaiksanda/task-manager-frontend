import { taskService } from "./taskService";

export const admin=taskService.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url:"/users/admin-dashboard",
                method:"GET"
            }),
            providesTags:["Tasks"]
        }),
        getUserDetails:builder.query({
            query:(id)=>({
                url:`/users/user-detail/${id}`,
                method:"GET"
            }),
            providesTags:["Tasks"]
        })
    })
})

export const {useGetUsersQuery,useGetUserDetailsQuery}=admin