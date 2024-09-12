import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const notificationAPI = createApi({
    reducerPath : 'notificationApi',
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/notification/`,credentials:'include'}),
    endpoints : (builder)=>({
        getBedRequests : builder.query({
            query : ()=> `getbedrequest`,
        }),
        handleBedRequestAction : builder.mutation({
            query : ({notificationId,action,score})=>({
                url : `handle-request`,
                method : 'POST',
                body : {notificationId,action,score},
            }),
        }),

    }),
});

export const {useHandleBedRequestActionMutation,useGetBedRequestsQuery} = notificationAPI;