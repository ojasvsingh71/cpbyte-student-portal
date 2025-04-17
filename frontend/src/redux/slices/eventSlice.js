import {createSlice} from "@reduxjs/toolkit"

export const eventSlice = createSlice({
    name:"event",
    initialState:{
        event:null,
        loading:false,
        error:null
    },
    reducers:{
        fetchEventsStart:(state)=>{
            state.loading=true
        },
        fetchEventsSuccess:(state, action)=>{
            state.loading=false,
            state.event=action.payload
        },
        fetchEventsFailure:(state, action)=>{
            state.loading=false,
            state.error=action.payload
        }
    }
})

export default eventSlice.reducer
export const {fetchEventsStart, fetchEventsSuccess, fetchEventsFailure} = eventSlice.actions;