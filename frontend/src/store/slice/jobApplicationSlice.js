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

const jobApplicationSlice = createSlice({
    name: 'jobApplication',
    initialState:{
        status : "idle",
        error: null
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.
            addCase(applyJobAPI.pending, state =>{
                state.status = "loading";
            })
            .addCase(applyJobAPI.fulfilled, state =>{
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(applyJobAPI.rejected, (state,action) =>{
                state.status = "failed",
                state.error = action.payload
            })
    }
})

export {applyJobAPI};
export default jobApplicationSlice.reducer;