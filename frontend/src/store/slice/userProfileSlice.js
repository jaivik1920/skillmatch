import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInterceptor";

const fetchUserProfileAPI = createAsyncThunk("userProfile/fetchUserProfileAPI" ,
    async(_,thunkAPI) =>{
        try {
            
            const response = await api.get("/user-service/user/profile")
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Error while fetching profile");
        }
    }
);

const updateUserProfileAPI = createAsyncThunk("userProfile/updateUserProfileAPI",
    async(userProfileData, thunkAPI) =>{
        try {
            const response = await api.put("/user-service/user/update-profile", userProfileData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Error while updating profile");
        }
    }
);

const updateUserProfileWithResumeAPI = createAsyncThunk("userProfile/updateUserProfileWithResumeAPI",
    async(userProfileData, thunkAPI) =>{
        try {
            const response = await api.put("/user-service/user/update-profile-with-resume", userProfileData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Error while updating profile");
        }
    }
);

const downloadResumeAPI = createAsyncThunk("userProfile/downloadResumeAPI",
    async(username, thunkAPI) =>{
        try 
        {
           const response = await api.get(`/user-service/user/resume/${username}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            const contentDisposition = response.headers["content-disposition"];
            let fileName = "resume.pdf";
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match && match.length > 1) fileName = match[1];
            }
            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();
            return "Download success";
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data || "Error while updating profile");
        }
    }
);

const userProfileSlice = createSlice(
    {
        name : "userProfile",
        initialState :{
            user : {},
            status : "idle",
            error : null,
            updateStatus : "idle"
        },
        reducers :{},
        extraReducers : (builder) =>{
            builder
                .addCase(fetchUserProfileAPI.pending, state =>{
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(fetchUserProfileAPI.fulfilled, (state,action) =>{
                    state.status = "Succeded";
                    state.user = action.payload;
                })
                .addCase(fetchUserProfileAPI.rejected, (state,action) =>{
                    state.status = "failed";
                    state.error = action.payload;
                })
                .addCase(updateUserProfileAPI.pending, state =>{
                    state.updateStatus = "loading";
                    state.error = null
                })
                .addCase(updateUserProfileAPI.fulfilled, (state, action)=>{
                    state.updateStatus = "Succeded";
                    state.user = action.payload;
                })
                .addCase(updateUserProfileAPI.rejected, (state,action) =>{
                    state.updateStatus = "failed";
                    state.error = action.payload;
                })
                .addCase(updateUserProfileWithResumeAPI.pending, state =>{
                    state.updateStatus = "loading";
                    state.error = null
                })
                .addCase(updateUserProfileWithResumeAPI.fulfilled, (state, action)=>{
                    state.updateStatus = "Succeded";
                    state.user = action.payload;
                })
                .addCase(updateUserProfileWithResumeAPI.rejected, (state,action) =>{
                    state.updateStatus = "failed";
                    state.error = action.payload;
                })
        }
    }
);

export {fetchUserProfileAPI, updateUserProfileAPI, downloadResumeAPI,updateUserProfileWithResumeAPI};
export default userProfileSlice.reducer;