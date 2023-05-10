import { createAsyncThunk } from "@reduxjs/toolkit"

import { emailAvailability, generateUser, verifyAccount, userLogin, generateNewCode, fetchUserProfile, patchUserProfile, userLogout, generateForgotPasswordOTP, generateNewPassword, patchUserPassword, adminLogin, publicSearch } from "../routes/auth.routes"


export const checkEmailAvailability = createAsyncThunk(
    'auth/checkEmailAvailability',
    async ({ formData, toast }, { rejectWithValue }) => {
        try {
            const { data } = await emailAvailability(formData)
            if (data.data) {
                toast.success('Email is available');
                return data
            }
            toast.warning("Email is already in use or unverified!")
            return rejectWithValue(null)
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred while checking email')
            return rejectWithValue(null)
        }
    }
)


export const createUser = createAsyncThunk(
    'auth/createUser',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await generateUser(formData)

            toast.success('Signup successful')
            navigate('/verify-account')

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during signup')
            return rejectWithValue(null)
        }
    }
)


export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async ({ formData, toast }, { rejectWithValue, }) => {
        try {
            const { data } = await patchUserProfile(formData,)


            const userFROMLS = localStorage.getItem('nimfd-user') ? JSON.parse(localStorage.getItem('nimfd-user')) : null

            const user = { ...userFROMLS, ...data.data }

            localStorage.setItem('nimfd-user', JSON.stringify(user))
            console.log(user, userFROMLS)

            toast.success('Profile updated successfully')

            return user
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during profile update')
            return rejectWithValue(null)
        }
    }
)



export const verifyUserAccount = createAsyncThunk(
    'auth/verifyUserAccount',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await verifyAccount(formData)

            toast.success('Account activation successful')
            navigate('/login')

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during account activation')
            return rejectWithValue(null)
        }
    }
)



export const requestNewCode = createAsyncThunk(
    'auth/requestNewCode',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await generateNewCode(formData)

            toast.success('Code generated successfully')
            const link = localStorage.getItem('nimfd-prev-link') ? localStorage.getItem('nimfd-prev-link') : null

            navigate(link)

            return data
        } catch (error) {
            console.log(error)
            if (error.response.data.reason === 'Email has already been verified.. Proceed to login') {
                toast.success('Account already verified')
                navigate('/login')
            } else {
                toast.warning('An error ocurred!')
            }
            return rejectWithValue(null)
        }
    }
)



export const requestForgotPasswordOTP = createAsyncThunk(
    'auth/requestForgotPasswordOTP',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await generateForgotPasswordOTP(formData)

            toast.success('OTP generated successfully')

            navigate('/update-password/' + formData.email)

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred!')
            return rejectWithValue(null)
        }
    }
)



export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await generateNewPassword(formData)

            toast.success('Password updated successfully')

            navigate('/login')

            return data
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred!')
            return rejectWithValue(null)
        }
    }
)


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await userLogin(formData)
            const user_profile = await fetchUserProfile(data.data.accessToken)

            const user = { ...user_profile.data.data, ...data.data }

            localStorage.setItem('nimfd-user', JSON.stringify(user))

            toast.success('Login successful')
            // navigate('/dashboard')
            // console.log(data.data)
            return user
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during login')
            return rejectWithValue(null)
        }
    }
)


export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async ({ formData, toast, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await adminLogin(formData)

            const user = { ...data.data }

            localStorage.setItem('nimfd-user', JSON.stringify(user))

            toast.success('Login successful')
            // navigate('/dashboard')
            // console.log(data.data)
            return user
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during login')
            return rejectWithValue(null)
        }
    }
)


export const updateUserPassword = createAsyncThunk(
    'auth/updateUserPassword',
    async ({ formData, toast, modals, setModals }, { rejectWithValue }) => {
        try {
            await patchUserPassword(formData)

            toast.success('Password updated successfully')
            setModals({ ...modals, showUpdatePasswordModal: !modals.showUpdatePasswordModal })

            return null
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during password update')
            return rejectWithValue(null)
        }
    }
)

export const getPublicRecord = createAsyncThunk(
    'public/publicSearch',
    async ({ currentPage, formData, toast, }, { rejectWithValue }) => {
        try {
            let pages = 0;
            let content = []
            const { data } = await publicSearch(currentPage, formData)
            // toast.success('Records fetched successfully')
            if (data.data?.pageContent) {
                content = [...data.data.pageContent]
                pages = data.data.totalPages
            } else {
                content = [...data.data]
            }
            return { content, pages }
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred while fetching records')
            return rejectWithValue(null)
        }
    }
)


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async ({ toast, navigate }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const formData = {
                accessToken: state.auth.user.accessToken,
                refreshToken: state.auth.user.refreshToken
            }

            await userLogout(formData)

            localStorage.removeItem('nimfd-user')

            toast.success('Logout successful')
            navigate('/')

            return null
        } catch (error) {
            console.log(error)
            toast.warning('An error ocurred during logout')
            return rejectWithValue(null)
        }
    }
)