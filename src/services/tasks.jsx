import { taskService } from "./taskService";

export const tasks = taskService.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: "/tasks/postTask",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tasks"],
        }),
        getTasks: builder.query({
            query: (filters) => ({
                url: "/tasks/getTasks",
                method: "GET",
                params: filters,
            }),
            providesTags: ["Tasks"],
        }),
        getTodayTasks: builder.query({
            query: (filters) => ({
                url: "/tasks/today-tasks",
                method: "GET",
                params: filters
            }),

            providesTags: ["Tasks"],
        }),
        getTask: builder.query({
            query: (id) => ({
                url: `/tasks/task/${id}`
            }),
            providesTags: ["Tasks"]

        }),
        updateTask: builder.mutation({
            query: ({ update}) => ({
                url: `/tasks/updateTask/${update.id}`,
                method: 'PUT',
                body: update,
            }),
            invalidatesTags: ["Tasks"]
        }),

        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/deleteTask/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Tasks"]
        })

    })
})

export const {
    useCreateTaskMutation, useGetTasksQuery, useGetTodayTasksQuery,
    useGetTaskQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasks;