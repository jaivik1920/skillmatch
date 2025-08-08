import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import jobReducer from "./slice/jobSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
    }
})