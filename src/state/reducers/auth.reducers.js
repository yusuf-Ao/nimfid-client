import { createSlice } from '@reduxjs/toolkit'

import { checkEmailAvailability, createUser, getPublicRecord, loginAdmin, loginUser, logoutUser, requestForgotPasswordOTP, updatePassword, updateUserPassword, updateUserProfile, verifyUserAccount } from '../actions/auth.actions'


const USERFROMLS = localStorage.getItem('nimfd-user') ? JSON.parse(localStorage.getItem('nimfd-user')) : null


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: USERFROMLS ? USERFROMLS : null,
        new_user: null,
        verified_user: null,
        email_availability: null,
        total_pages: null,
        search_data: null,
        authLoading: false,
        authRequestStatus: null,
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.authLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.authLoading = false
            state.user = action.payload
        },
        [loginUser.rejected]: (state, action) => {
            state.authLoading = false
        },

        [loginAdmin.pending]: (state, action) => {
            state.authLoading = true
        },
        [loginAdmin.fulfilled]: (state, action) => {
            state.authLoading = false
            state.user = action.payload
        },
        [loginAdmin.rejected]: (state, action) => {
            state.authLoading = false
        },

        [logoutUser.pending]: (state, action) => {
            state.authLoading = true
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.authLoading = false
            state.user = action.payload
        },
        [logoutUser.rejected]: (state, action) => {
            state.authLoading = false
        },

        [checkEmailAvailability.pending]: (state, action) => {
            state.authLoading = true
        },
        [checkEmailAvailability.fulfilled]: (state, action) => {
            state.authLoading = false
            state.email_availability = action.payload
        },
        [checkEmailAvailability.rejected]: (state, action) => {
            state.authLoading = false
        },

        [createUser.pending]: (state, action) => {
            state.authLoading = true
        },
        [createUser.fulfilled]: (state, action) => {
            state.authLoading = false
            state.new_user = action.payload
        },
        [createUser.rejected]: (state, action) => {
            state.authLoading = false
        },

        [updateUserProfile.pending]: (state, action) => {
            state.authLoading = true
        },
        [updateUserProfile.fulfilled]: (state, action) => {
            state.authLoading = false
            state.user = action.payload
        },
        [updateUserProfile.rejected]: (state, action) => {
            state.authLoading = false
        },

        [verifyUserAccount.pending]: (state, action) => {
            state.authLoading = true
        },
        [verifyUserAccount.fulfilled]: (state, action) => {
            state.authLoading = false
            state.verified_user = action.payload
        },
        [verifyUserAccount.rejected]: (state, action) => {
            state.authLoading = false
        },

        [requestForgotPasswordOTP.pending]: (state, action) => {
            state.authLoading = true
        },
        [requestForgotPasswordOTP.fulfilled]: (state, action) => {
            state.authLoading = false
            // state.verified_user = action.payload
        },
        [requestForgotPasswordOTP.rejected]: (state, action) => {
            state.authLoading = false
        },

        [updatePassword.pending]: (state, action) => {
            state.authLoading = true
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.authLoading = false
            // state.verified_user = action.payload
        },
        [updatePassword.rejected]: (state, action) => {
            state.authLoading = false
        },

        [updateUserPassword.pending]: (state, action) => {
            state.authLoading = true
        },
        [updateUserPassword.fulfilled]: (state, action) => {
            state.authLoading = false
            // state.verified_user = action.payload
        },
        [updateUserPassword.rejected]: (state, action) => {
            state.authLoading = false
        },
        [getPublicRecord.pending]: (state, action) => {
            state.authLoading = true
        },
        [getPublicRecord.fulfilled]: (state, action) => {
            state.authLoading = false
            state.total_pages = action.payload.pages
            state.search_data = action.payload.content
        },
        [getPublicRecord.rejected]: (state, action) => {
            state.authLoading = false
        },
    }
})


export default authSlice.reducer;