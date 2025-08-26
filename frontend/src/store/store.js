import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import jobReducer from "./slice/jobSlice";
import jobApplication from "./slice/jobApplicationSlice";
import notificationReducer from "./slice/notificationSlice";
import postJobReducer from "./slice/postJobslice";
import applicantReducer from "./slice/applicantSlice";
import userProfileReducer from "./slice/userProfileSlice";

const appReducer = combineReducers({
        auth: authReducer,
        job: jobReducer,
        jobApplication: jobApplication,
        notification : notificationReducer,
        postJob: postJobReducer,
        applicant: applicantReducer,
        userProfile: userProfileReducer,
});

const rootReducer = (state, action) =>{
    if(action.type === "auth/logout")
        state = undefined;

    return appReducer(state,action);
}

export const store = configureStore({
    reducer: rootReducer
});