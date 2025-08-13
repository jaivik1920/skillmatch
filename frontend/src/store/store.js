import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import jobReducer from "./slice/jobSlice";
import jobApplication from "./slice/jobApplicationSlice";
import notificationReducer from "./slice/notificationSlice";
import postJobReducer from "./slice/postJobslice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        jobApplication: jobApplication,
        notification : notificationReducer,
        postJob: postJobReducer,
    }
})