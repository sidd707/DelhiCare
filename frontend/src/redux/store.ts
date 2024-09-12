import { configureStore } from "@reduxjs/toolkit";
import { dashBoardAPI } from "./apis/dashBoardApi";
import { userAPI } from "./apis/userApi";
import { inventoryAPI } from "./apis/inventoryApi";
import { notificationAPI } from "./apis/notificationApi";
import { userReducer } from "./reducers/userReducer";
import { hospitalAPI } from "./apis/hospitalApi";
import { patientAPI } from "./apis/patientApi";

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath] : userAPI.reducer,
        [dashBoardAPI.reducerPath] : dashBoardAPI.reducer,
        [inventoryAPI.reducerPath] : inventoryAPI.reducer,
        [notificationAPI.reducerPath] : notificationAPI.reducer,
        [hospitalAPI.reducerPath] : hospitalAPI.reducer,
        [patientAPI.reducerPath] : patientAPI.reducer,
        [userReducer.name] : userReducer.reducer,
        
    },
    middleware : (mid)=>mid().concat(userAPI.middleware,dashBoardAPI.middleware,inventoryAPI.middleware,notificationAPI.middleware,hospitalAPI.middleware,patientAPI.middleware),
  });
export type RootState = ReturnType<typeof store.getState>;