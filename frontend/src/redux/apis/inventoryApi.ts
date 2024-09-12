import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const inventoryAPI = createApi({
    reducerPath : 'inventoryApi',
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/inventory/`,credentials:'include'}),
    endpoints : (_builder)=>({
        
    }),
});

export const {} = inventoryAPI;
