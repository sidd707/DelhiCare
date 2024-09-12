import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    loading: true,
};

// Safely parse the cookie value
const userInfo = Cookies.get('userInfo');
if (userInfo) {
    try {
        initialState.user = JSON.parse(userInfo);
    } catch (error) {
        console.error("Failed to parse userInfo cookie:", error);
        Cookies.remove('userInfo'); // Remove invalid cookie
    }
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            Cookies.set('userInfo', JSON.stringify(action.payload), { expires: 30, secure: true });
        },
        userNotExists: (state) => {
            state.loading = false;
            state.user = null;
            Cookies.remove('userInfo');
        }
    }
});

export const { userExists, userNotExists } = userReducer.actions;
