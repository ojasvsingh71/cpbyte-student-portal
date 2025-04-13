import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: {},
        loading: false,
        error: null,
    },
    reducers: {
        fetchDashboardDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDashboardDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDashboardDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const { fetchDashboardDataStart, fetchDashboardDataSuccess, fetchDashboardDataFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;