import { API } from "../config"


export const fetchDashboardStatistics = () => API.get(`matrix/statistics`)


export const fetchMemberUsers = (current_page) => API.get(`system/fetch-users?page=${current_page}&size=10`)


export const fetchAllOrganizations = (current_page) => API.get(`matrix/fetch-orgs?page=${current_page}&size=10`)
