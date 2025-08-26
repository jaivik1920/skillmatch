import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInterceptor";


const applyJobAPI = createAsyncThunk('application/applyJobAPI',
   async (jobId, thunkAPI) =>{
        try {
            const response = await api.post("/application-service/apply", {jobId});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Job applcation failed to submit");
        }
    }
)

const getApplicationsByApplicantIdAPI = createAsyncThunk('application/getApplicationsByApplicantIdAPI',
   async (applicantId, thunkAPI) =>{
        try {
            const response = await api.get(`/application-service/getApplicationsByApplicantIdWithJobDetails/${applicantId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Failed to failed applications");
        }
    }
)

const jobApplicationSlice = createSlice({
    name: 'jobApplication',
    initialState:{
        applyStatus : "idle",
        applications: [],
        applyError: null,
        applicationListStatus : "idle",
        applicationListError : null
    },
    reducers:{
            setApplicationListStatus : (state,action) =>{
                state.applicationListStatus = action.payload;
            }
    },
    extraReducers: (builder)=>{
        builder.
            addCase(applyJobAPI.pending, state =>{
                state.applyStatus = "loading";
                state.applyError = null;
            })
            .addCase(applyJobAPI.fulfilled, state =>{
                state.applyStatus = "succeeded";
                state.applyError = null;
            })
            .addCase(applyJobAPI.rejected, (state,action) =>{
                state.applyStatus = "failed";
                state.applyError = action.payload;
            })
            .addCase(getApplicationsByApplicantIdAPI.pending, state =>{
                state.applicationListStatus = "loading";
                state.applicationListError = null;
            })
            .addCase(getApplicationsByApplicantIdAPI.fulfilled, (state,action) =>{
                state.applicationListStatus = "succeeded";
                state.applications = action.payload;
                state.applicationListError = null;
            })
            .addCase(getApplicationsByApplicantIdAPI.rejected, (state,action) =>{
                state.applicationListStatus = "failed";
                state.applicationListError = action.payload || "failed to fetch applications";
            })
    }
})

export const {setApplicationListStatus} = jobApplicationSlice.actions;
export {applyJobAPI, getApplicationsByApplicantIdAPI};
export default jobApplicationSlice.reducer;