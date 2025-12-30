import { taskService } from "./taskService";

export const dashboard = taskService.injectEndpoints({
  endpoints: (builder) => ({
    dashboardData: builder.query({
      query: (filters) => ({
        url: "/users/dashboard",
        method: "GET",
        params: filters,
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useDashboardDataQuery } = dashboard;
