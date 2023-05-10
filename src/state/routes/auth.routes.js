import { API } from '../config'


export const emailAvailability = (formData) => API.post(`user/email-availability?email=${formData.email}`, formData,)


export const generateUser = (formData) => API.post(`user/register`, formData,)


export const patchUserProfile = (formData) => API.put(`user/update-profile`, formData,)


export const verifyAccount = (formData) => API.post(`user/verify-account?email=${formData.email}&code=${formData.code}`, formData,)


export const generateNewCode = (formData) => API.post(`user/resend-code?email=${formData.email}`, formData,)


export const generateForgotPasswordOTP = (formData) => API.post(`user/forgot-password?email=${formData.email}`, formData,)


export const generateNewPassword = (formData) => API.post(`user/reset-password?email=${formData.email}`, formData,)


export const patchUserPassword = (formData) => API.put(`user/update-password`, formData,)


export const userLogin = (formData) => API.post(`auth/user-login`, formData,)


export const adminLogin = (formData) => API.post(`auth/system-login`, formData,)
// export const adminLogin = (formData) => API.post(`auth/system-login?username=${formData.username}&password=${formData.password}`, formData, { headers: { 'Content-Type': 'application/json' } })


export const userLogout = (formData) => API.post(`auth/revoke-access`, formData,)

export const publicSearch = (current_page, formData) => API.get(`public/find-org?page=${current_page}&size=50&showMap=${formData.showMap}&query=${formData.query}&location=${formData.location}&orgTypes=${formData.orgTypes}&categories=${formData.categories}`, formData,)


export const fetchUserProfile = (token) => API.get(`user`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })