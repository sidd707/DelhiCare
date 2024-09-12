import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const hospitalAPI = createApi({
    reducerPath: "hospitalApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/hospital/`, credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerHospital: builder.mutation({
            query: (hospitalData) => ({
                url: 'register',
                method: 'POST',
                body: hospitalData,
            }),
        }),
        loginHospital: builder.mutation({
            query: (loginData) => ({
                url: 'login',
                method: 'POST',
                body: loginData,
            }),
        }),
        logoutHospital: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {useRegisterHospitalMutation,useLoginHospitalMutation,useLogoutHospitalMutation} = hospitalAPI;