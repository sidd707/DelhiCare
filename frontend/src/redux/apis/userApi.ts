import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios"

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`, credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        initiateRegistration: builder.mutation({
            query: (user) => ({
                url: "register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        verifyOtpAndRegister: builder.mutation({
            query: (userData) => ({
                url: "verify-otp",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useInitiateRegistrationMutation,
    useVerifyOtpAndRegisterMutation,
    useLoginMutation,
} = userAPI;

export const fetchUserData = async () => {
    try {
        const userData = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/me`, {
            withCredentials: true,
        });
        return userData.data.user;
    } catch (error) {
        throw error;
    }
};
