import { createSlice } from "@reduxjs/toolkit";

export const AttendanceSlice = createSlice({
    name:"attendance",
    initialState:{
        data:{},
        loading:true,
        error:null
    },
    reducers: {
        fetchUsersOfDomainStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersOfDomainSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchUserOfDomainFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const {fetchUserOfDomainFailure,fetchUsersOfDomainStart,fetchUsersOfDomainSuccess} = AttendanceSlice.actions;
export default AttendanceSlice.reducer;