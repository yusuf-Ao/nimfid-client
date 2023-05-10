import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import ModalHeader from './ModalHeader'
import { useStateContext } from '../../state/context'
import { updateUserPassword } from '../../state/actions/auth.actions'


const UpdatePasswordModal = () => {
    const dispatch = useDispatch()

    const { modals, setModals } = useStateContext()

    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
    const [config, setConfig] = useState({ showCurrentPassword: false, showNewPassword: false, showConfirmPassword: false })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        )

        if (!pattern.test(formData.newPassword)) return toast.error('Password must include a number, uppercae and lowercase alphabet')
        if (formData.newPassword.length <= 7) return toast.error('Password must be at least 8 characters')

        if(formData.newPassword !== formData.confirmPassword) return toast.error('Password do not match')
        
        dispatch(updateUserPassword({ formData, toast, modals, setModals }))
    }

    return (
        <div className="fixed grid h-screen w-full z-10 bg-[#11111180] place-items-center">
            <div className="bg-white w-[500px] px-[30px] py-[20px]">
                <div className="flex flex-col space-y-5">
                    <ModalHeader
                        type={1}
                        title="Update Password"
                        modalHandler={() => setModals({ ...modals, showUpdatePasswordModal: !modals.showUpdatePasswordModal })}
                    />

                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                            <input
                                type={config.showCurrentPassword ? "text" : "password"}
                                name="currentPassword"
                                onChange={handleChange}
                                className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-slate-500 focus:border-slate-500 block w-full pl-5 pr-6 py-2"
                            />
                            <FaEye
                                className={`absolute right-4 bottom-4 cursor-pointer ${config.showCurrentPassword ? 'text-teal-600' : 'text-gray-800'}`}
                                onClick={() => setConfig({ ...config, showCurrentPassword: !config.showCurrentPassword })}
                            />
                        </div>

                        <div className="relative mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                            <input
                                type={config.showNewPassword ? "text" : "password"}
                                name="newPassword"
                                onChange={handleChange}
                                className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-slate-500 focus:border-slate-500 block w-full pl-5 pr-6 py-2"
                            />
                            <FaEye
                                className={`absolute right-4 bottom-4 cursor-pointer ${config.showNewPassword ? 'text-teal-600' : 'text-gray-800'}`}
                                onClick={() => setConfig({ ...config, showNewPassword: !config.showNewPassword })}
                            />
                        </div>

                        <div className="relative mb-8">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input
                                type={config.showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                onChange={handleChange}
                                className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-slate-500 focus:border-slate-500 block w-full pl-5 pr-6 py-2"
                            />
                            <FaEye
                                className={`absolute right-4 bottom-4 cursor-pointer ${config.showConfirmPassword ? 'text-teal-600' : 'text-gray-800'}`}
                                onClick={() => setConfig({ ...config, showConfirmPassword: !config.showConfirmPassword })}
                            />
                        </div>


                        <button
                            type="submit"
                            className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-teal-300 font-medium rounded text-sm w-full px-5 py-4 text-center"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePasswordModal