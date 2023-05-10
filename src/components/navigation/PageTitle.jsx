import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useStateContext } from '../../state/context'


const PageTitle = ({ type, showDirectorateDropDown, setShowDirectorateDropDown, directorateDropdownItem, setDirectorateDropdownItem, showAddDirectorateModal, setShowAddDirectorateModal, showAddDepartmentModal, setShowAddDepartmentModal, ...props }) => {
    const dispatch = useDispatch()

    const { modals, setModals} = useStateContext()


    return (
        <div className="flex justify-between items-center px-2">
            <div className="flex flex-col">
                {type === 'admin-users' && (
                    <Fragment>
                        <h1 className='text-[16px] text-dark-blue font-bold'>Users</h1>
                        <p className='text-[12px] text-gray-600 font-normal'>Users management.</p>
                    </Fragment>
                )}

                {type === 'admin-overview' && (
                    <Fragment>
                        <h1 className='text-[16px] text-dark-blue font-bold'>Overview</h1>
                        <p className='text-[12px] text-gray-600 font-normal'>System overview.</p>
                    </Fragment>
                )}
               
                {type === 'admin-organizations' && (
                    <Fragment>
                        <h1 className='text-[16px] text-dark-blue font-bold'>Oragnizations</h1>
                        <p className='text-[12px] text-gray-600 font-normal'>Oragnizations management.</p>
                    </Fragment>
                )}
                
                {type === 'user-overview' && (
                    <Fragment>
                        <h1 className='text-[16px] text-dark-blue font-bold'>Overview</h1>
                        <p className='text-[12px] text-gray-600 font-normal'>User overview.</p>
                    </Fragment>
                )}
            
                {type === 'user-organizations' && (
                    <Fragment>
                        <h1 className='text-[16px] text-dark-blue font-bold'>Organizations</h1>
                        <p className='text-[12px] text-gray-600 font-normal'>Oragnizations management.</p>
                    </Fragment>
                )}

                {type === 'profile' && (
                    <Fragment>
                        <h1 className='text-[16px] text-dark-blue font-bold'>Profile</h1>
                        <p className='text-[12px] text-gray-600 font-normal'>Profile management.</p>
                    </Fragment>
                )}
            </div>


            {type === 'user-organizations' && (
                <div className="flex items-center">
                    <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-green active:shadow-lg transition duration-500 ease"
                        onClick={() => setModals({ ...modals, showUserAddOrganizationModal: !modals.showUserAddOrganizationModal })}
                     >
                        Add Organization
                    </button>
                </div>
            )}


            {type === 'profile' && (
                <div className="flex items-center">
                    <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-green active:shadow-lg transition duration-500 ease"
                        onClick={() => setModals({ ...modals, showUpdatePasswordModal: !modals.showUpdatePasswordModal })}
                     >
                        Update Password
                    </button>
                </div>
            )}
        </div >
    )
}

export default PageTitle