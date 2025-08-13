import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice(
    {
        name: 'notification',
        initialState : {
            notifications : []
        },
        reducers :{
            addNotification : (state, action) =>{
                state.notifications.push(action.payload);
            },
            clearNotications: state =>{
                state.notifications.splice(0, state.notifications.length);
            }
        }
    }
)

export const {addNotification, clearNotications} = notificationSlice.actions;

export default notificationSlice.reducer;