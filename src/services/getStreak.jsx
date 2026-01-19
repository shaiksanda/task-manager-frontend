import { taskService } from "./taskService";

export const streak = taskService.injectEndpoints({
    endpoints: (builder) => ({
        getStreakData: builder.query({
            query: (filters) => ({
                url: "/users/streak",
                method: "GET",
                params:filters
            }),
            providesTags:["Tasks"]

        })
    })
})

export const {useGetStreakDataQuery}=streak