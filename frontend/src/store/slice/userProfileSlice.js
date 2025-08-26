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
)

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
        }
    }
);

export {fetchUserProfileAPI, updateUserProfileAPI};
export default userProfileSlice.reducer;