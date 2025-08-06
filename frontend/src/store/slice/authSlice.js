import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem('token') || null,
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login : (state, action) =>{
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);    
        },
        logout : (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token');
        }
    },
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;