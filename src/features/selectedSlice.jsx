import { createSlice } from "@reduxjs/toolkit";

const selectedSlice=createSlice({
    name:"selected",
    initialState:{
        selectedIdx:0
    },
    reducers:{
        setSelectedIndex:(state,action)=>{
            state.selectedIdx=action.payload
        }
    }
})

export const {setSelectedIndex}=selectedSlice.actions
export default selectedSlice.reducer