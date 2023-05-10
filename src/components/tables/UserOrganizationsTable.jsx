/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegEye, FaPencilAlt, FaTrash } from 'react-icons/fa'

import Pagination from '../utils/Pagination'
import { useStateContext } from '../../state/context'
import { setCurrentOrganization } from '../../state/actions/user.actions'
import PagePagination from '../utils/PagePagination'


const UserOrganizationsTable = ({ data, setCurrentPageFetch }) => {
    const dispatch = useDispatch()

    const { modals, setModals } = useStateContext()

    const { total_pages } = useSelector(state => state.user)

    const [totalPages, setTotalPages] = useState([])
    const [currentData, setCurrentData] = useState([])
    const [filterState, setFilterState] = useState({ search: '', organizations: [] })

    const handleFilter = () => {
        const filtered = data
            ?.filter(item => {
                return item.orgUID.toLowerCase().includes(filterState.search.toLowerCase())
                    || item.orgName.toLowerCase().includes(filterState.search.toLowerCase())
                    || item.organizationType.toLowerCase().includes(filterState.search.toLowerCase())
                    || item.affiliationDetails.affiliationCategory.toLowerCase().includes(filterState.search.toLowerCase())
            })

        setFilterState({ ...filterState, organizations: filtered })

        if (filterState.search === '') {
            setFilterState({ ...filterState, organizations: data })
        }
    }

    useEffect(() => {
        handleFilter()
    }, [filterState.search])

    useEffect(() => {
        setFilterState({ ...filterState, organizations: data })
    }, [data])

    useEffect(() => {
        let count = 1
        const pages = []

        if (total_pages) {
            for (var i = 0; i < total_pages; i++) {
                pages.push(count)
                count++
            }

            setTotalPages(pages)
        }
    }, [total_pages])
    console.log(total_pages)
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col w-full">
                <div className="space-y-1">
                    <div className="flex justify-start items-center space-x- h-[40px]">
                        <input
                            type="text"
                            name="search"
                            placeholder='Search'
                            className="border border-gray-400 w-[300px] h-full px-4 mt-2 text-[12px] font-medium text-gray-600 placeholder:text-[12px] hover:outline-none focus:outline-none focus:ring-blue-500 focus:ring-blue"
                            onChange={(e) => setFilterState({ ...filterState, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <Fragment>
                        <table className="border rounded w-full cursor-default">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 pl-4 py-4 text-left"
                                    >
                                        {/* S/N */}
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Affiliation
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Members
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        State
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((organization, index) => (
                                    <tr key={`${index}`}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {organization.orgUID}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {organization.orgName}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {organization.organizationType}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light whitespace-nowrap">
                                            {organization.affiliationDetails.affiliationCategory}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {organization.members.totalMembers}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {organization.contactDetails.state}
                                        </td>
                                        <td className=" flex text-2xl space-x-4 text-gray-900 font-semibold py-4 whitespace-nowrap">
                                            <FaRegEye
                                                size={18}
                                                className="cursor-pointer text-slate-600"
                                                onClick={() => {
                                                    dispatch(setCurrentOrganization({ data: organization }))
                                                    setModals({ ...modals, showUserViewOrganizationModal: !modals.showUserViewOrganizationModal })
                                                }}
                                            />

                                            <FaPencilAlt
                                                size={18}
                                                className="cursor-pointer text-green-600"
                                                onClick={() => {
                                                    dispatch(setCurrentOrganization({ data: organization }))
                                                    setModals({ ...modals, showUserUpdateOrganizationModal: !modals.showUserUpdateOrganizationModal })
                                                }}
                                            />

                                            <FaTrash
                                                size={18}
                                                className="cursor-pointer text-red-600"
                                                onClick={() => {
                                                    dispatch(setCurrentOrganization({ data: organization }))
                                                    setModals({ ...modals, showUserDeleteOrganizationModal: !modals.showUserDeleteOrganizationModal })
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <PagePagination
                            data={totalPages}
                            setCurrentPageFetch={setCurrentPageFetch}
                        />
                        {/* <Pagination
                            data={filterState.organizations}
                            currentData={currentData}
                            setCurrentData={setCurrentData}
                        /> */}
                    </Fragment>
                </div>
            </div>
        </div >
    )
}

export default UserOrganizationsTable
