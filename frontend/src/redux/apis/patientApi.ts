import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientAPI = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/patient/`, credentials: 'include' }),
    endpoints: (builder) => ({
        createPatient: builder.mutation({
            query: (patientData) => ({
                url: '/new',
                method: 'POST',
                body: patientData,
            }),
        }),
    }),
});

export const {useCreatePatientMutation} = patientAPI;