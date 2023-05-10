import { createSlice } from '@reduxjs/toolkit'

import { getAllOrganizations, getAllUsers, getDashboardInfo } from '../actions/admin.actions'


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: null,
        total_user_pages: null,
        total_organization_pages: null,
        organizations: null,
        dashboard_info: null,
        adminLoading: false,
        adminRequestStatus: null,
    },
    extraReducers: {
        [getDashboardInfo.pending]: (state, action) => {
            state.adminLoading = true
        },
        [getDashboardInfo.fulfilled]: (state, action) => {
            state.adminLoading = false
            state.dashboard_info = action.payload
        },
        [getDashboardInfo.rejected]: (state, action) => {
            state.adminLoading = false
        },
    
        [getAllUsers.pending]: (state, action) => {
            state.adminLoading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.adminLoading = false
            state.users = action.payload.data
            state.total_user_pages = action.payload.pages
        },
        [getAllUsers.rejected]: (state, action) => {
            state.adminLoading = false
        },
    
        [getAllOrganizations.pending]: (state, action) => {
            state.adminLoading = true
        },
        [getAllOrganizations.fulfilled]: (state, action) => {
            state.adminLoading = false
            state.organizations = action.payload.data
            state.total_organization_pages = action.payload.pages
        },
        [getAllOrganizations.rejected]: (state, action) => {
            state.adminLoading = false
        },
    }
})


export default adminSlice.reducer;