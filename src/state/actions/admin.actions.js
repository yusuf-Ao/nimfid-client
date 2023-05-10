import { createAsyncThunk } from "@reduxjs/toolkit"

import { fetchAllOrganizations, fetchDashboardStatistics, fetchMemberUsers } from "../routes/admin.routes"


export const getDashboardInfo = createAsyncThunk(
    'admin/getDashboardInfo',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchDashboardStatistics()

            return data.data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const getAllUsers = createAsyncThunk(
    'admin/getAllUsers',
    async ({current_page}, { rejectWithValue }) => {
        try {
            const { data } = await fetchMemberUsers(current_page)

            console.log(data.data)

            return { data: data.data.pageContent, pages: data.data.totalPages }
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)


export const getAllOrganizations = createAsyncThunk(
    'admin/getAllOrganizations',
    async ({current_page}, { rejectWithValue }) => {
        try {
            const { data } = await fetchAllOrganizations(current_page)

            console.log(data)
            
            return { data: data.data.pageContent, pages: data.data.totalPages }
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(null)
        }
    }
)
