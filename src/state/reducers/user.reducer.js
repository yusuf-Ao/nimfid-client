import { createSlice } from '@reduxjs/toolkit'

import { deleteOrganization, getDashboardInfo, getOrganizations, registerOrganization, setCurrentOrganization, updateOrganization } from '../actions/user.actions'


const userSlice = createSlice({
    name: 'user',
    initialState: {
        total_pages: null,
        organizations: null,
        dashboard_info: null,
        new_organization: null,
        current_organization: null,
        userLoading: false,
        userRequestStatus: null,
    },
    extraReducers: {
        [getDashboardInfo.pending]: (state, action) => {
            state.userLoading = true
        },
        [getDashboardInfo.fulfilled]: (state, action) => {
            state.userLoading = false
            state.dashboard_info = action.payload
        },
        [getDashboardInfo.rejected]: (state, action) => {
            state.userLoading = false
        },
     
        [getOrganizations.pending]: (state, action) => {
            state.userLoading = true
        },
        [getOrganizations.fulfilled]: (state, action) => {
            state.userLoading = false
            state.total_pages = action.payload.pages
            state.organizations = action.payload.data
        },
        [getOrganizations.rejected]: (state, action) => {
            state.userLoading = false
        },
      
        [registerOrganization.pending]: (state, action) => {
            state.userLoading = true
        },
        [registerOrganization.fulfilled]: (state, action) => {
            state.userLoading = false
            state.new_organization = action.payload
        },
        [registerOrganization.rejected]: (state, action) => {
            state.userLoading = false
        },
         
        [updateOrganization.pending]: (state, action) => {
            state.userLoading = true
        },
        [updateOrganization.fulfilled]: (state, action) => {
            state.userLoading = false
            state.new_organization = action.payload
        },
        [updateOrganization.rejected]: (state, action) => {
            state.userLoading = false
        },
      
        [deleteOrganization.pending]: (state, action) => {
            state.userLoading = true
        },
        [deleteOrganization.fulfilled]: (state, action) => {
            state.userLoading = false
            state.organizations = state.organizations.filter(org => org.id !== action.payload)
        },
        [deleteOrganization.rejected]: (state, action) => {
            state.userLoading = false
        },
      
        [setCurrentOrganization.pending]: (state, action) => {
            state.userLoading = true
        },
        [setCurrentOrganization.fulfilled]: (state, action) => {
            state.userLoading = false
            state.current_organization = action.payload
        },
        [setCurrentOrganization.rejected]: (state, action) => {
            state.userLoading = false
        },
    }
})


export default userSlice.reducer;