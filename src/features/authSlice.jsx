import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:{},
        isLoggedIn:false
    },
    reducers:{
        setUser:(state,action)=>{
            state.user={ ...state.user, ...action.payload }
            state.isLoggedIn=true
        },
        removeUser:(state)=>{
            state.user = {}
            state.isLoggedIn = false;  
        }
    }
})

export const {setUser,removeUser}=authSlice.actions

export default authSlice.reducer