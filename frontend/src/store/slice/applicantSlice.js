import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInterceptor";


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
        applicantsByJob : {}
    },
    reducers :{
            setApplicantsByJobStatus : (state,action)=>{
                if(!state.applicantsByJob[action.payload.jobId])
                    state.applicantsByJob[action.payload.jobId] = { status: "idle", applicantList: [], error: null };
                state.applicantsByJob[action.payload.jobId].status = action.payload.status;
            }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(fetchApplicantsAPI.pending, (state,action) =>{
                const jobId = action.meta.arg;
                state.applicantsByJob[jobId] = {
                    status : "loading",
                    applicantList : [],
                    error : null
                }
            })
            .addCase(fetchApplicantsAPI.fulfilled, (state,action) =>{
                const jobId = action.meta.arg;
                state.applicantsByJob[jobId].status = "Succeeded";
                state.applicantsByJob[jobId].error = null;
                state.applicantsByJob[jobId].applicantList = action.payload;
            })
            .addCase(fetchApplicantsAPI.rejected, (state,action) =>{
                const jobId = action.meta.arg;
                state.applicantsByJob[jobId].status = "failed";
                state.applicantsByJob[jobId].error = action.payload || "failed to fetch applicants";
            })
            .addCase(updateApplicationStatusAPI.fulfilled , (state,action) =>{
                const jobId = action.meta.arg.jobId;
                state.applicantsByJob[jobId].applicantList = state.applicantsByJob[jobId].applicantList.map(application =>{
                    return (application.applicationId === action.payload.id ? { ...application, status: action.payload.status } : application); 
                });
            })
    }
});


export {fetchApplicantsAPI, updateApplicationStatusAPI};
export const {setApplicantsByJobStatus} = applicantslice.actions;
export default applicantslice.reducer;