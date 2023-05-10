import React from 'react'
import { toast } from 'react-toastify'
import { FaTimesCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import ModalHeader from '../ModalHeader'
import { useStateContext } from '../../../state/context'
import { deleteOrganization } from '../../../state/actions/user.actions'


const UserDeleteOrganizationModal = () => {
    const dispatch = useDispatch()

    const { modals, setModals } = useStateContext()

    const { current_organization } = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(deleteOrganization({ formData: { id: current_organization?.id }, toast, setModals, modals }))
    }

    return (
        <div className="fixed grid h-screen w-full z-10 bg-[#11111180] place-items-center">
            <div className="bg-white w-[500px] px-[30px] py-[20px]">
                <div className="flex flex-col space-y-5">
                    <ModalHeader
                        type={3}
                        title="Delete"
                        modalHandler={() => setModals({ ...modals, showUserDeleteOrganizationModal: !modals.showUserDeleteOrganizationModal })}
                    />

                    <form onSubmit={handleSubmit}>
                        <p className="text-left">Are you sure you want to delete the organization <span className='font-bold italic'>{current_organization?.orgName}</span> ?</p>

                        <div className='mt-4 flex justify-end'>
                            <button
                                type='submit'
                                className="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight rounded shadow-md hover:scale-90 transition duration-500 ease"
                            >Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserDeleteOrganizationModal