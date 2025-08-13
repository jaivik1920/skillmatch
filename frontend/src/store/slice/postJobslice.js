import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInterceptor";


const postJobAPI = createAsyncThunk('job/postJobAPI',
   async (job, thunkAPI) =>{
        try {
            const response = await api.post("/job-service/addJob", job);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Job Posting failed");
        }
   }
)

const postJobSlice = createSlice({
    name: 'postJob',
    initialState :{
        loading : false,
        job: null,
        error: null
    },
    reducers :{

    },
    extraReducers : builder =>{
        builder
            .addCase(postJobAPI.pending, state =>{
                state.loading = true;
            })
            .addCase(postJobAPI.fulfilled, (state,action)=>{
                state.loading = false;
                state.job = action.payload;
                state.error = null;
            })
            .addCase(postJobAPI.rejected, (state,action) =>{
                state.error = action.payload || "Job Posting failed";
            })
    }
})

export {postJobAPI};
export default postJobSlice.reducer;