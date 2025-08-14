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
        status : "idle",
        applications: [],
        error: null
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.
            addCase(applyJobAPI.pending, state =>{
                state.status = "loading";
                state.error = null;
            })
            .addCase(applyJobAPI.fulfilled, state =>{
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(applyJobAPI.rejected, (state,action) =>{
                state.status = "failed",
                state.error = action.payload
            })
            .addCase(getApplicationsByApplicantIdAPI.pending, state =>{
                state.status = "loading";
                state.error = null;
            })
            .addCase(getApplicationsByApplicantIdAPI.fulfilled, (state,action) =>{
                state.status = "succeeded";
                state.applications = action.payload;
                state.error = null;
            })
            .addCase(getApplicationsByApplicantIdAPI.rejected, (state,action) =>{
                state.status = "failed";
                state.error = action.payload || "failed to fetch applications";
            })
    }
})

export {applyJobAPI, getApplicationsByApplicantIdAPI};
export default jobApplicationSlice.reducer;