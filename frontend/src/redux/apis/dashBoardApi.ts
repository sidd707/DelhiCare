import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const dashBoardAPI = createApi({
    reducerPath : 'dashboardApi',
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,credentials:'include'}),
    endpoints : (builder)=>({
        bedStats : builder.query({
            query : ()=> `bedstats?hospitalId=66cb40474edb56b45ea1f793`,
        }),
    }),
});

export const {useBedStatsQuery} = dashBoardAPI;