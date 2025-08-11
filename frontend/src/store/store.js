import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import jobReducer from "./slice/jobSlice";
import jobApplication from "./slice/jobApplicationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        jobApplication: jobApplication,
    }
})