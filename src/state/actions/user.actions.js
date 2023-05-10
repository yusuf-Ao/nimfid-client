import { createAsyncThunk } from "@reduxjs/toolkit"

import { fetchDashboardInfo, fetchOrganizations, generateOrganization, patchOrganization, removeOrganization } from "../routes/user.routes";


export const getDashboardInfo = createAsyncThunk(
    'user/getDashboardInfo',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchDashboardInfo()

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const getOrganizations = createAsyncThunk(
    'user/getOrganizations',
    async ({current_page}, { rejectWithValue }) => {
        try {
            const { data } = await fetchOrganizations(current_page)

            return { data: data.data.pageContent, pages: data.data.totalPages }
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)


export const registerOrganization = createAsyncThunk(
    'user/registerOrganization',
    async ({ formData, toast, modals, setModals }, { rejectWithValue }) => {
        try {
            const { data } = await generateOrganization(formData)

            toast.success('Organization successfully registered');
            setModals({ ...modals, showUserAddOrganizationModal: !modals.showUserAddOrganizationModal })

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred while registering organization')
            return rejectWithValue(null)
        }
    }
)


export const updateOrganization = createAsyncThunk(
    'user/updateOrganization',
    async ({ formData, toast, modals, setModals }, { rejectWithValue }) => {
        try {
            const { data } = await patchOrganization(formData)

            toast.success('Organization successfully updated');
            setModals({ ...modals, showUserUpdateOrganizationModal: !modals.showUserUpdateOrganizationModal })

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred while updating organization')
            return rejectWithValue(null)
        }
    }
)


export const deleteOrganization = createAsyncThunk(
    'user/deleteOrganization',
    async ({ formData, toast, modals, setModals }, { rejectWithValue }) => {
        try {
            await removeOrganization(formData)

            toast.success('Organization deleted');
            setModals({ ...modals, showUserDeleteOrganizationModal: !modals.showUserDeleteOrganizationModal })

            return formData.id
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred while deleting organization')
            return rejectWithValue(null)
        }
    }
)


export const setCurrentOrganization = createAsyncThunk(
    'user/setCurrentOrganization',
    async ({ data }, { rejectWithValue }) => {
        try {
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)