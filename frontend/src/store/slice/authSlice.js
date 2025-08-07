import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/axiosInterceptor";

const initialState = {
    token : localStorage.getItem('token') || null,
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    message: null
}


const loginAPI = createAsyncThunk('auth/loginAPI', 
    async (credentials, thunkAPI) =>{
    try {  
        const response = await api.post('/user-service/auth/login', credentials);
        return response.data;
    }catch (error) {   
        return thunkAPI.rejectWithValue(error?.response?.data || "Login failed");
    }
})

const registerAPI = createAsyncThunk('auth/registerAPI',
    async (userData, thunkAPI) =>{
        try {
            const response = await api.post('/user-service/auth/register', userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.respose?.data || "Registration failed");
        }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout : (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem('token');
        },
        setMessage: (state, action) =>{
            state.message = action.payload;
        },
        clearMessage: (state) =>{
            state.message = null;
        }
    },
    extraReducers: builder =>{
        builder
            .addCase(loginAPI.pending, state =>{
                state.loading = true;
            })
            .addCase(loginAPI.fulfilled, (state,action) =>{
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.error = null;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginAPI.rejected, (state,action) =>{
                state.loading = false;
                state.error = action.payload || "Login failed";
            })
            .addCase(registerAPI.pending, state =>{
                state.loading = true;
            })
            .addCase(registerAPI.fulfilled, (state,action) =>{
                state.loading = false;
                state.error = null;
            })
            .addCase(registerAPI.rejected, (state,action) =>{
                state.loading = false;
                state.error= action.payload || "Registration failed";
            })
            
    }
})

export const {logout,setMessage,clearMessage} = authSlice.actions;
export {loginAPI, registerAPI};
export const authState = (state) => state.auth;
export default authSlice.reducer;