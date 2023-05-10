import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { lgas, states } from '../../data'
import { ButtonLoader, PageTitle } from '../../components'
import { updateUserProfile } from '../../state/actions/auth.actions'


const Profile = () => {
	const dispatch = useDispatch()

	const { user, authLoading } = useSelector(state => state.auth)

	const [formData, setFormData] = useState({
		firstName: '', lastName: '',
		email: '', country: '', gender: '',
		state: '', lga: '', houseNo: '',
		streetName: '', phoneNumber: '',
		dateOfBirth: ''
	})
	const [localGovernmentAreas, setLocalGovernmentAreas] = useState([])

	useEffect(() => {
		let values = []

		setFormData({
			...formData,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			country: user?.country,
			state: user?.state,
			phoneNumber: user?.phoneNumber,
			lga: user?.lga,
			gender: user?.gender,
			houseNo: user?.houseNo,
			streetName: user?.streetName,
			dateOfBirth: user?.dateOfBirth,
		})

		lgas?.filter(lga => {
			Object.values(lga[user?.state])?.forEach((val) => values.push(val))
		})
		setLocalGovernmentAreas(values)
	}, [user])

	useEffect(() => {
		const values = []

		if (formData.state) {
			lgas?.filter(lga => {
				Object.values(lga[formData?.state])?.forEach((val) => values.push(val))
			})
			setLocalGovernmentAreas(values)
		}
	}, [formData.state])


	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}


	const handleUpdate = (e) => {
		e.preventDefault()

		// console.log(formData)
		dispatch(updateUserProfile({ formData, toast }))
	}


	return (
		<div>
			<PageTitle
				type={'profile'}
			/>

			<div className="flex flex-col space-y-5 px-2 pt-5">
				<form onSubmit={handleUpdate}>
					<div className="w-full flex flex-wrap justify-between pb-5">
						<div className="space-y-5">
							<div className='flex justify-between items-center w-[500px]'>
								<div className='-space-y-1 w-full'>
									<label className='font-medium text-[14px] text-slate-800'>First Name</label>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-400 focus:ring-blue"
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='flex justify-between items-center w-[500px]'>
								<div className='-space-y-1 w-full'>
									<label className='font-medium text-[14px] text-slate-800'>Last Name</label>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-400 focus:ring-blue"
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='flex justify-between items-center w-[500px]'>
								<div className='-space-y-1 w-full'>
									<label className='font-medium text-[14px] text-slate-800'>Email</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-400 focus:ring-blue"
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='flex justify-between items-center w-[500px]'>
								<div className='-space-y-1 w-full'>
									<label className='font-medium text-[14px] text-slate-800'>Phone</label>
									<input
										type="text"
										name="patient_phone"
										value={`0${formData.phoneNumber}`}
										className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-500 focus:ring-blue"
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="">
								<div className="flex items-center space-x-5">
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900">Male</label>
										<input
											checked={formData.gender === 'MALE'}
											type="radio"
											name="gender"
											value="MALE"
											onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
											className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-2"
										/>
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900">Female</label>
										<input
											checked={formData.gender === 'FEMALE'}
											type="radio"
											name="gender"
											value="FEMALE"
											onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
											className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-2"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-5">
							<div className="-space-y-1 w-full">
								<label className='font-medium text-[14px] text-slate-800'>Date of Birth</label>
								<input
									type="date"
									name="dateOfBirth"
									onChange={handleChange}
									value={`${formData.dateOfBirth.slice(0, 10)}`}
									className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-500 focus:ring-blue"
								// className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 "
								/>
							</div>

							<div className="-space-y-1 w-full">
								<label className='font-medium text-[14px] text-slate-800'>State</label>
								<select
									type="text"
									name="state"
									onChange={handleChange}
									value={formData.state}
									className="border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-[4px]"
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

							<div className="-space-y-1 w-full">
								<label className='font-medium text-[14px] text-slate-800'>LGA  or Ward</label>
								<select
									type="text"
									name="lga"
									onChange={handleChange}
									value={formData.lga}
									className="border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-[4px]"
								>
									<option value="">---</option>
									{localGovernmentAreas?.map(lga => (
										<option
											key={lga}
											value={lga}
										>{lga}</option>
									))}
								</select>
							</div>


							<div className='flex justify-between items-center w-[500px]'>
								<div className='-space-y-1 w-full'>
									<label className='font-medium text-[14px] text-slate-800'>House No</label>
									<input
										type="text"
										name="houseNo"
										value={formData.houseNo}
										className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-500 focus:ring-blue"
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='flex justify-between items-center w-[500px]'>
								<div className='-space-y-1 w-full'>
									<label className='font-medium text-[14px] text-slate-800'>Address</label>
									<input
										type="text"
										name="streetName"
										value={formData.streetName}
										className="border rounded w-full h-5 px-4 py-4 mt-2 text-[14px] hover:outline-none focus:outline-none focus:ring-blue-500 focus:ring-blue"
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-center mt-10">
						{!authLoading ? (
							<button
								type="submit"
								className="w-[200px] bg-sky-600 text-[14px] text-white py-2 px-6"
							>
								Update Profile
							</button>
						) : (
							<button
								type="submit"
								disabled
								className="w-[200px] bg-sky-600 text-[14px] text-white py-2 px-6"
							>
								<ButtonLoader />
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default Profile