/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegEye, FaPencilAlt, FaTrash } from 'react-icons/fa'

import Pagination from '../utils/Pagination'
import { useStateContext } from '../../state/context'
import { setCurrentOrganization } from '../../state/actions/user.actions'
import PagePagination from '../utils/PagePagination'


const AdminUsersTable = ({ data, setCurrentPageFetch }) => {
    const dispatch = useDispatch()

    const { modals, setModals } = useStateContext()

    const { total_user_pages } = useSelector(state => state.admin)

    const [totalPages, setTotalPages] = useState([])
    const [currentData, setCurrentData] = useState([])
    const [filterState, setFilterState] = useState({ search: '', users: [] })

    const handleFilter = () => {
        const filtered = data
            ?.filter(item => {
                return item.firstName.toLowerCase().includes(filterState.search.toLowerCase())
                    || item.lastName.toLowerCase().includes(filterState.search.toLowerCase())
                    || item.email.toLowerCase().includes(filterState.search.toLowerCase())
                    || item.gender.toLowerCase().includes(filterState.search.toLowerCase())
            })

        setFilterState({ ...filterState, users: filtered })

        if (filterState.search === '') {
            setFilterState({ ...filterState, users: data })
        }
    }

    useEffect(() => {
        handleFilter()
    }, [filterState.search])

    useEffect(() => {
        setFilterState({ ...filterState, users: data })
    }, [data])

    useEffect(() => {
        let count = 1
        const pages = []

        if (total_user_pages) {
            for (var i = 0; i < total_user_pages; i++) {
                pages.push(count)
                count++
            }

            setTotalPages(pages)
        }
    }, [total_user_pages])

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
                                        Fullname
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >
                                        Gender
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
                                        Status
                                    </th>
                                    {/* <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 py-4 text-left"
                                    >

                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((user, index) => (
                                    <tr key={`${index}`}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {`${user.lastName} ${user.firstName}`}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {`0${user.phoneNumber}`}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light whitespace-nowrap">
                                            {user.gender}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {user.state}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                            {user.accountStatus}
                                        </td>
                                        {/* <td className=" flex text-2xl space-x-4 text-gray-900 font-semibold py-4 whitespace-nowrap">
                                            <FaRegEye
                                                size={18}
                                                className="cursor-pointer text-slate-600"
                                                onClick={() => {
                                                    dispatch(setCurrentOrganization({ data: user }))
                                                    setModals({ ...modals, showUserViewOrganizationModal: !modals.showUserViewOrganizationModal })
                                                }}
                                            />

                                            <FaPencilAlt
                                                size={18}
                                                className="cursor-pointer text-green-600"
                                                onClick={() => {
                                                    dispatch(setCurrentOrganization({ data: user }))
                                                    setModals({ ...modals, showUserUpdateOrganizationModal: !modals.showUserUpdateOrganizationModal })
                                                }}
                                            />

                                            <FaTrash
                                                size={18}
                                                className="cursor-pointer text-red-600"
                                                onClick={() => {
                                                    dispatch(setCurrentOrganization({ data: user }))
                                                    setModals({ ...modals, showUserDeleteOrganizationModal: !modals.showUserDeleteOrganizationModal })
                                                }}
                                            />
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <PagePagination
                            data={totalPages}
                            setCurrentPageFetch={setCurrentPageFetch}
                        />
                        {/* <Pagination
                            data={filterState.users}
                            currentData={currentData}
                            setCurrentData={setCurrentData}
                        /> */}
                    </Fragment>
                </div>
            </div>
        </div >
    )
}

export default AdminUsersTable
