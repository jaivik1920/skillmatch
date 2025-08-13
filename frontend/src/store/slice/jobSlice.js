import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInterceptor";


const fetchJobsAPI = createAsyncThunk("jobs/fetchJobsAPI",
    async (thunkAPI) =>{
        try {
            const response = await api.get("/job-service/getAllJobs");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Failed to fetch jobs");
        }
    }
)

const jobslice = createSlice({
    name: 'jobs',
    initialState:{
        jobs:[],
        error: null,
        status: 'idle'
    },
    reducers:{
            setStatus : (state,action) =>{
                state.status = action.payload;
            }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchJobsAPI.pending, state =>{
                state.status = "loading";
            })
            .addCase(fetchJobsAPI.fulfilled, (state,action) =>{
                state.status = "Succeeded";
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(fetchJobsAPI.rejected, (state,action) =>{
                state.status = "failed";
                state.error = action.payload || "Failed to fetch jobs";
            })
    }
});

export {fetchJobsAPI};
export const {setStatus} = jobslice.actions;
export default jobslice.reducer;