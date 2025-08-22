import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInterceptor";
import { act } from "react";


const fetchApplicantsAPI = createAsyncThunk("applicant/fetchApplicantsAPI" ,
    async(jobId, thunkAPI) =>{
        try {
            const response = await api.get(`application-service/getApplicationsWithDetailsByJobId/${jobId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Error while fetching appplicants");
        }
    }
);

const updateApplicationStatusAPI = createAsyncThunk("applicant/updateApplicationStatusAPI", 
    async(applicationData, thunkAPI) =>{
        try {
            const response = await api.put("application-service/updateApplication", applicationData);
            return applicationData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response.data || "Error while updating application status");
        }
    }
)

const applicantslice = createSlice({
    name: "applicant",
    initialState : {
        applicantList : [],
        status : "idle",
        error : null
    },
    reducers :{

    },
    extraReducers : (builder) =>{
        builder
            .addCase(fetchApplicantsAPI.pending, state =>{
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchApplicantsAPI.fulfilled, (state,action) =>{
                state.status = "Succeeded";
                state.error = null;
                state.applicantList = action.payload;
            })
            .addCase(fetchApplicantsAPI.rejected, (state,action) =>{
                state.status = "failed";
                state.error = action.payload || "failed to fetch applicants";
            })
            .addCase(updateApplicationStatusAPI.fulfilled , (state,action) =>{
                state.applicantList = state.applicantList.map(application =>{
                    return (application.applicationId === action.payload.id ? { ...application, status: action.payload.status } : application); 
                });
            })
    }
});


export {fetchApplicantsAPI, updateApplicationStatusAPI};
export default applicantslice.reducer;