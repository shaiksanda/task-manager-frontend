import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from 'js-cookie';
import {removeUser} from "../features/authSlice"


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = Cookies.get("jwt_token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);


    if (result.error && result.error.status === 401) {
        api.dispatch(removeUser());
        Cookies.remove("jwt_token");
        navigate("/")
    }

    return result;
};

export const taskService = createApi({
    reducerPath: "taskApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Tasks"],
    endpoints:()=>({}),
})