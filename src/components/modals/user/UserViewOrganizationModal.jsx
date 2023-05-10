import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import ModalHeader from '../ModalHeader'
import { lgas, states } from '../../../data'
import { useStateContext } from '../../../state/context'
import { updateOrganization } from '../../../state/actions/user.actions'


const UserViewOrganizationModal = () => {
    const dispatch = useDispatch()

    const { modals, setModals } = useStateContext()

    const { current_organization } = useSelector(state => state.user)

    const [config, setConfig] = useState({
        showFormOne: true, showFormTwo: false, showFormThree: false,
    })
    const [formData, setFormData] = useState({
        id: 0, orgName: '', organizationType: '', capitalOwned: '',
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
        console.log(current_organization)
        setFormData({
            ...formData,
            id: current_organization?.id,
            orgName: current_organization?.orgName,
            organizationType: current_organization?.organizationType,
            capitalOwned: current_organization?.capitalOwned,
            officeAddress: current_organization?.contactDetails.officeAddress,
            village_ward: current_organization?.contactDetails.village_ward,
            state: current_organization?.contactDetails.state,
            lga: current_organization?.contactDetails.lga,
            city: current_organization?.contactDetails.city,
            officialEmail: current_organization?.contactDetails.officialEmail,
            officePhone: current_organization?.contactDetails.officePhone,
            website: current_organization?.contactDetails.website,
            menMembers: current_organization?.members.menMembers,
            womenMembers: current_organization?.members.womenMembers,
            physicallyDisabledMembers: current_organization?.members.physicallyDisabledMembers,
            youthMembers: current_organization?.members.youthMembers,
            totalMembers: current_organization?.members.totalMembers,
            menLoan: current_organization?.outstandingPortfolio.menLoan,
            womenLoan: current_organization?.outstandingPortfolio.womenLoan,
            physicallyDisabledLoan: current_organization?.outstandingPortfolio.physicallyDisabledLoan,
            youthLoan: current_organization?.outstandingPortfolio.youthLoan,
            totalLoan: current_organization?.outstandingPortfolio.totalLoan,
            menSavings: current_organization?.savingsMobilized.menSavings,
            womenSavings: current_organization?.savingsMobilized.womenSavings,
            physicallyDisabledSavings: current_organization?.savingsMobilized.physicallyDisabledSavings,
            youthSavings: current_organization?.savingsMobilized.youthSavings,
            totalSavings: current_organization?.savingsMobilized.totalSavings,
            affiliationCategory: current_organization?.affiliationDetails.affiliationCategory,
            affiliationNumber: current_organization?.affiliationDetails.affiliationNumber,
        })
    }, [current_organization])

    useEffect(() => {
        let values = []
        lgas?.filter(lga => {
            Object.values(lga[formData?.state])?.forEach((val) => values.push(val))
        })
        setLocalGovernmentAreas(values)
    }, [formData.state])


    return (
        <div className="fixed grid h-screen z-10 bg-[#11111180] place-items-center w-full">
            <div className="bg-white px-[30px] py-[20px]">
                <ModalHeader
                    type={2}
                    title={`${formData.orgName}`}
                    modalHandler={() => setModals({ ...modals, showUserViewOrganizationModal: !modals.showUserViewOrganizationModal })}
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
                                        disabled
                                        value={formData.orgName}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Organization Type</label>
                                    <input
                                        type="text"
                                        name="website"
                                        disabled
                                        value={formData.organizationType}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Capital Owned</label>
                                    <input
                                        type="text"
                                        name="capitalOwned"
                                        disabled
                                        value={formData.capitalOwned}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Office Address</label>
                                    <input
                                        type="text"
                                        name="officeAddress"
                                        disabled
                                        value={formData.officeAddress}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Ward</label>
                                    <input
                                        type="text"
                                        name="village_ward"
                                        disabled
                                        value={formData.village_ward}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        disabled
                                        value={formData.website}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                            </div>


                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">State</label>
                                    <input
                                        type="text"
                                        name="website"
                                        disabled
                                        value={formData.state}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Local Government Area</label>
                                    <input
                                        type="text"
                                        name="website"
                                        disabled
                                        value={formData.lga}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        disabled
                                        value={formData.city}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        type="email"
                                        name="officialEmail"
                                        disabled
                                        value={formData.officialEmail}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <input
                                        type="text"
                                        name="officePhone"
                                        disabled
                                        minLength={11}
                                        value={`0${formData.officePhone}`}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="pt-7 mt-10">
                                    <button
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setConfig({ ...config, showFormOne: false, showFormTwo: true, showFormThree: false })
                                        }}
                                        className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:outline-none font-medium text-sm px-5 py-2 text-center"
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
                                        type="text"
                                        name="menMembers"
                                        disabled
                                        value={formData.menMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Women Members</label>
                                    <input
                                        type="text"
                                        name="womenMembers"
                                        disabled
                                        value={formData.womenMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Physically Disabled Members</label>
                                    <input
                                        type="text"
                                        name="physicallyDisabledMembers"
                                        disabled
                                        value={formData.physicallyDisabledMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Youth Members</label>
                                    <input
                                        type="text"
                                        name="youthMembers"
                                        disabled
                                        value={formData.youthMembers}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Total Members</label>
                                    <input
                                        type="text"
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
                                        type="text"
                                        name="website"
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div> */}
                            </div>


                            <div className="space-y-2 w-[350px]">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Men Loan</label>
                                    <input
                                        type="text"
                                        name="menLoan"
                                        disabled
                                        value={formData.menLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Women Loan</label>
                                    <input
                                        type="email"
                                        name="womenLoan"
                                        disabled
                                        value={formData.womenLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Physically Disabled Loan</label>
                                    <input
                                        type="text"
                                        name="physicallyDisabledLoan"
                                        disabled
                                        value={formData.physicallyDisabledLoan}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Youth Loan</label>
                                    <input
                                        type="text"
                                        name="youthLoan"
                                        disabled
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
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="pt-7 mt-10">
                                    <button
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setConfig({ ...config, showFormOne: false, showFormTwo: false, showFormThree: true })
                                        }}
                                        className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:outline-none font-medium text-sm px-5 py-2 text-center"
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
                                        type="text"
                                        name="menSavings"
                                        disabled
                                        value={formData.menSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Women Savings</label>
                                    <input
                                        type="text"
                                        name="womenSavings"
                                        disabled
                                        value={formData.womenSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Physically Disabled Savings</label>
                                    <input
                                        type="text"
                                        name="physicallyDisabledSavings"
                                        disabled
                                        value={formData.physicallyDisabledSavings}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Youth Savings</label>
                                    <input
                                        type="text"
                                        name="youthSavings"
                                        disabled
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
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Affiliation Number</label>
                                    <input
                                        type="text"
                                        name="affiliationNumber"
                                        disabled
                                        value={formData.affiliationNumber}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Affiliation Category</label>
                                    <input
                                        type="text"
                                        name="website"
                                        disabled
                                        value={formData.affiliationCategory}
                                        className="border border-gray-300 text-gray-900 text-lg rounded focus:ring-blue-500 focus:border-slate-500 block px-4 py-1 outline-none w-full"
                                    />
                                </div>

                                {/* <div className="pt-7 mt-10">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:outline-none font-medium text-sm px-5 py-2 text-center"
                                    >
                                        Update
                                    </button>
                                </div> */}

                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default UserViewOrganizationModal