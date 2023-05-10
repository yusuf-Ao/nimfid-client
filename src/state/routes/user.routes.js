import { API } from "../config"


export const fetchDashboardInfo = () => API.get(`model/statistics`,)


export const fetchOrganizations = (current_page) => API.get(`model/fetch-orgs?page=${current_page}&size=10`,)


export const generateOrganization = (formData) => API.post(`model/add`, formData,)


export const patchOrganization = (formData) => API.put(`model/update/${formData.id}`, formData,)


export const removeOrganization = (formData) => API.delete(`model/delete/${formData.id}`,)