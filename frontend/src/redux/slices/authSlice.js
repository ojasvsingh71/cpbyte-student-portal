import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        token:null,
        loading:false,
        error:null
    },
    reducers:{
        loginStart: (state)=>{
            state.loading=true
        },
        loginSuccess:(state, action)=>{
            state.loading=false,
            state.token=action.payload,
            state.error=null
        },
        loginFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        logoutSuccess: (state)=>{
            state.token=null,
            state.error=null
        },
        logoutFailure:(state, action)=>{
            state.error=action.payload
        }
    }
})

export const {loginStart, loginSuccess, logoutSuccess, logoutFailure, loginFailure} = authSlice.actions;
export default authSlice.reducer;