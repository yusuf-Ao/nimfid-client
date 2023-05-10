import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ModalHeader from '../ModalHeader'
import { lgas, states } from '../../../data'
import { useStateContext } from '../../../state/context'
import { toast } from 'react-toastify'
import { registerOrganization } from '../../../state/actions/user.actions'


const UserAddOrganizationModal = () => {
    const dispatch = useDispatch()

    const { modals, setModals } = useStateContext()

    const [config, setConfig] = useState({
        showFormOne: true, showFormTwo: false, showFormThree: false,
    })
    const [formData, setFormData] = useState({
        orgName: '', organizationType: '', capitalOwned: '',
        officeAddress: '', village_ward: '', state: 'Abia', lga: '',
        city: '', officialEmail: '', officePhone: '', website: '',
        menMembers: '', womenMembers: '', physicallyDisabledMembers: '',
        youthMembers: '', totalMembers: '', menLoan: '', womenLoan: '',
        physicallyDisabledLoan: '', youthLoan: '', totalLoan: '', menSavings: '',
        womenSavings: '', physicallyDisabledSavings: '', youthSavings: '',
        totalSavings: '', affiliationNumber: '', affiliationCategory: ''
    })
    const [localGovernmentAreas, setLocalGovernmentAreas] = useState([])

    useEffect(() => {
        let values = []
        lgas?.filter(lga => {
            Object.values(lga[formData?.state])?.forEach((val) => values.push(val))
        })
        setLocalGovernmentAreas(values)
    }, [formData.state])

    useEffect(() => {
        if (formData.menMembers && formData.womenMembers && formData.physicallyDisabledMembers && formData.youthMembers) {
            setFormData({ ...formData, totalMembers: parseInt(formData.menMembers) + parseInt(formData.womenMembers) + parseInt(formData.physicallyDisabledMembers) + parseInt(formData.youthMembers) })
        }
    }, [formData.menMembers, formData.womenMembers, formData.physicallyDisabledMembers, formData.youthMembers])

    useEffect(() => {
        if (formData.menLoan && formData.womenLoan && formData.physicallyDisabledLoan && formData.youthLoan) {
            setFormData({ ...formData, totalLoan: parseInt(formData.menLoan) + parseInt(formData.womenLoan) + parseInt(formData.physicallyDisabledLoan) + parseInt(formData.youthLoan) })
        }
    }, [formData.menLoan, formData.womenLoan, formData.physicallyDisabledLoan, formData.youthLoan])

    useEffect(() => {
        if (formData.menSavings && formData.womenSavings && formData.physicallyDisabledSavings && formData.youthSavings) {
            setFormData({ ...formData, totalSavings: parseInt(formData.menSavings) + parseInt(formData.womenSavings) + parseInt(formData.physicallyDisabledSavings) + parseInt(formData.youthSavings) })
        }
    }, [formData.menSavings, formData.womenSavings, formData.physicallyDisabledSavings, formData.youthSavings])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.menSavings || !formData.womenSavings || !formData.physicallyDisabledSavings || !formData.youthSavings || !formData.totalSavings || !formData.affiliationNumber || !formData.affiliationCategory) {
            return toast.error('All fields are required')
        }

        if (formData.menSavings < 0) return toast.error('Men savings must be a positive number')
        if (formData.womenSavings < 0) return toast.error('Women savings must be a positive number')
        if (formData.physicallyDisabledSavings < 0) return toast.error('Physically disabled savings must be a positive number')
        if (formData.youthSavings < 0) return toast.error('Youth savings must be a positive number')

        dispatch(registerOrganization({ formData, toast, modals, setModals }))
    }

    return (
        <div className="fixed grid h-screen z-10 bg-[#11111180] place-items-center w-full">
            <div className="bg-white px-[30px] py-[20px]">
                <ModalHeader
                    type={1}
                    title="Add Organization"
                    modalHandler={() => setModals({ ...modals, showUserAddOrganizationModal: !modals.showUserAddOrganizationModal })}
                />

                <form
                    className='mt-5'
                >
                    {config.showFormOne && (
                        <div className="flex justify-end">
                            <p className='pb-6 text-[10px] underline font-medium'>Organization/Contact Details</p>
                        </div>
                    )}
                    {config.showFormTwo && (
                        <div className="flex justify-between">
                            <p
                                className='pb-6 text-[10px] underline font-medium cursor-pointer text-red-600'
                                onClick={() => setConfig({ ...config, showFormOne: true, showFormTwo: false, showFormThree: false })}
                            >{`<<< `}Organization/Contact Details</p>
                            <p className='pb-6 text-[10px] underline font-medium'>Member/Portfolio(LOAN) Details</p>
                        </div>
                    )}
                    {config.showFormThree && (
                        <div className="flex justify-between">
                            <p
                                className='pb-6 text-[10px] underline font-medium cursor-pointer text-red-600'
                                onClick={() => setConfig({ ...config, showFormOne: false, showFormTwo: true, showFormThree: false })}
                            >{`<<< `}Member/Portfolio(LOAN) Details</p>
                            <p className='pb-6 text-[10px] underline font-medium'>Savings/Affiliation Details</p>
                        </div>
                    )}

                    {config.showFormOne && (
                        <div className="flex justify-between space-x-5">
                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Organization Name</label>
                                    <input
                                        type="text"
                                        name="orgName"
                                        onChange={handleChange}
                                        value={formData.orgName}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Organization Type</label>
                                    <select
                                        type="text"
                                        name="organizationType"
                                        onChange={handleChange}
                                        value={formData.organizationType}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-teal-500 focus:border-teal-600 block pl-5 px-4 py-1 outline-none w-full"
                                    >
                                        <option value="">---</option>
                                        {['MFI', 'NGO', 'COOPERATIVE']?.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item}
                                            >{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Capital Owned</label>
                                    <input
                                        type="number"
                                        name="capitalOwned"
                                        min={'0'}
                                        placeholder='100000'
                                        onChange={handleChange}
                                        value={formData.capitalOwned}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Office Address</label>
                                    <input
                                        type="text"
                                        name="officeAddress"
                                        onChange={handleChange}
                                        value={formData.officeAddress}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Ward</label>
                                    <input
                                        type="text"
                                        name="village_ward"
                                        onChange={handleChange}
                                        value={formData.village_ward}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        placeholder='nfi.org.ng'
                                        onChange={handleChange}
                                        value={formData.website}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                            </div>


                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">State</label>
                                    <select
                                        type="text"
                                        name="state"
                                        onChange={handleChange}
                                        value={formData.state}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-teal-500 focus:border-teal-600 block pl-5 px-2.5 py-1 outline-none w-full"
                                    >
                                        <option value="">---</option>
                                        {states?.map(state => (
                                            <option
                                                key={state}
                                                value={state}
                                            >{state}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Local Government Area</label>
                                    <select
                                        type="text"
                                        name="lga"
                                        onChange={handleChange}
                                        value={formData.lga}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-teal-500 focus:border-teal-600 block pl-5 px-2.5 py-1 outline-none w-full"
                                    >
                                        <option value="">---</option>
                                        {localGovernmentAreas?.map(area => (
                                            <option
                                                key={area}
                                                value={area}
                                            >{area}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        onChange={handleChange}
                                        value={formData.city}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        type="email"
                                        name="officialEmail"
                                        onChange={handleChange}
                                        value={formData.officialEmail}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <input
                                        type="number"
                                        name="officePhone"
                                        minLength={10}
                                        onChange={handleChange}
                                        value={formData.officePhone}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="pt-7 mt-10">
                                    <button
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault()

                                            if (!formData.orgName || !formData.organizationType || !formData.capitalOwned || !formData.officeAddress || !formData.village_ward || !formData.website || !formData.state || !formData.lga || !formData.city || !formData.officialEmail || !formData.officePhone) {
                                                return toast.error('All fields are required')
                                            }

                                            if(formData.capitalOwned < 0) return toast.error('Capital owned must be greater than 0')
                                            if(formData.officePhone.length < 11) return toast.error('Office phone must be equals to eleven')

                                            setConfig({ ...config, showFormOne: false, showFormTwo: true, showFormThree: false })
                                        }}
                                        className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none font-medium text-sm px-5 py-2 text-center"
                                    >
                                        Next
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                    {config.showFormTwo && (
                        <div className="flex justify-between space-x-5">
                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Men Members</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="menMembers"
                                        onChange={handleChange}
                                        value={formData.menMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Women Members</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="womenMembers"
                                        onChange={handleChange}
                                        value={formData.womenMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Physically Disabled Members</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="physicallyDisabledMembers"
                                        onChange={handleChange}
                                        value={formData.physicallyDisabledMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Youth Members</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="youthMembers"
                                        onChange={handleChange}
                                        value={formData.youthMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Total Members</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="totalMembers"
                                        disabled
                                        value={formData.totalMembers}
                                        // onChange={handleChange}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                {/* <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Website</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="website"
                                        onChange={handleChange}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div> */}
                            </div>


                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Men Loan</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="menLoan"
                                        onChange={handleChange}
                                        value={formData.menLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Women Loan</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="womenLoan"
                                        onChange={handleChange}
                                        value={formData.womenLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Physically Disabled Loan</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="physicallyDisabledLoan"
                                        onChange={handleChange}
                                        value={formData.physicallyDisabledLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Youth Loan</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="youthLoan"
                                        onChange={handleChange}
                                        value={formData.youthLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Total Loan</label>
                                    <input
                                        type="text"
                                        name="totalLoan"
                                        disabled
                                        value={formData.totalLoan}
                                        // onChange={handleChange}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="pt-7 mt-10">
                                    <button
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (!formData.menMembers || !formData.womenMembers || !formData.physicallyDisabledMembers || !formData.youthMembers || !formData.totalMembers || !formData.website || !formData.menLoan || !formData.womenLoan || !formData.physicallyDisabledLoan || !formData.youthLoan || !formData.totalLoan) {
                                                return toast.error('All fields are required')
                                            }

                                            if(formData.menMembers < 0) return toast.error('Men members must be a positive number')
                                            if(formData.womenMembers < 0) return toast.error('Women members must be a positive number')
                                            if(formData.physicallyDisabledMembers < 0) return toast.error('Physically disabled members must be a positive number')
                                            if(formData.youthMembers < 0) return toast.error('Youth members must be a positive number')
                                            if(formData.menLoan < 0) return toast.error('Men loan amount must be a positive number')
                                            if(formData.womenLoan < 0) return toast.error('Men loan amount must be a positive number')
                                            if(formData.physicallyDisabledLoan < 0) return toast.error('Men loan amount must be a positive number')
                                            if(formData.youthLoan < 0) return toast.error('Men loan amount must be a positive number')

                                            setConfig({ ...config, showFormOne: false, showFormTwo: false, showFormThree: true })
                                        }}
                                        className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none font-medium text-sm px-5 py-2 text-center"
                                    >
                                        Next
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                    {config.showFormThree && (
                        <div className="flex justify-between space-x-5">
                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Men Savings</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="menSavings"
                                        onChange={handleChange}
                                        value={formData.menSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Women Savings</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="womenSavings"
                                        onChange={handleChange}
                                        value={formData.womenSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Physically Disabled Savings</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="physicallyDisabledSavings"
                                        onChange={handleChange}
                                        value={formData.physicallyDisabledSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Youth Savings</label>
                                    <input
                                        type="number"
                                        min={'0'}
                                        name="youthSavings"
                                        onChange={handleChange}
                                        value={formData.youthSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Total Savings</label>
                                    <input
                                        type="text"
                                        name="totalSavings"
                                        disabled
                                        value={formData.totalSavings}
                                        // onChange={handleChange}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Affiliation Number</label>
                                    <input
                                        type="text"
                                        name="affiliationNumber"
                                        onChange={handleChange}
                                        value={formData.affiliationNumber}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Affiliation Category</label>
                                    <select
                                        type="text"
                                        name="affiliationCategory"
                                        onChange={handleChange}
                                        value={formData.affiliationCategory}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:outline-none focus:ring-teal-500 focus:border-teal-600 block pl-5 px-2.5 py-1 outline-none w-full"
                                    >
                                        <option value="">---</option>
                                        {['A', 'B', 'C', 'D', 'E']?.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item}
                                            >{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-7 mt-10">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:outline-none font-medium text-sm px-5 py-2 text-center"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default UserAddOrganizationModal