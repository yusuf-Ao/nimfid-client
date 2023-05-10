import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NiMFID } from '../../assets'

import { ArtBuilding } from '../../assets'
import { lgas, states } from '../../data'
import { checkEmailAvailability, createUser } from '../../state/actions/auth.actions'


const Signup = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { email_availability } = useSelector(state => state.auth)

	const [localGovernmentAreas, setLocalGovernmentAreas] = useState([])
	const [config, setConfig] = useState({ showPassword: false, showConfirmPassword: false, emailCheck: false })
	const [formData, setFormData] = useState({
		firstName: '', lastName: '', gender: '', dateOfBirth: '',
		email: '', password: '', country: 'Nigeria', state: 'Abia',
		lga: '', city: '', houseNo: '', streetName: '', phoneNumber: '',
		confirm_password: ''
	})

	useEffect(() => {
		let values = []
		lgas.filter(lga => {
			Object.values(lga[formData?.state])?.forEach((val) => values.push(val))
		})
		setLocalGovernmentAreas(values)
	}, [formData.state])

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleEmailCheck = (e) => {
		e.preventDefault()
		// setConfig({ ...config, emailCheck: !config.emailCheck })
		console.log(formData)

		dispatch(checkEmailAvailability({ formData, toast }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const pattern = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
		)

		if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dateOfBirth || !formData.email || !formData.country || !formData.state || !formData.lga || !formData.city || !formData.houseNo || !formData.streetName || !formData.phoneNumber) {
			return toast.error('All fields are required')
		}

		if (!pattern.test(formData.password)) return toast.error('Password must include a number, uppercae and lowercase alphabet')
		if (formData.password.length <= 7) return toast.error('Password must be at least 8 characters')

		if (formData.password !== formData.confirm_password) return toast.error('Passwords do not match!')

		dispatch(createUser({ formData, toast, navigate }))
	}

	return (
		<div>
			<div className='sticky top-0 left-0 bg-white h-16 drop-shadow-md'>
				<nav className='flex justify-between py-3 px-[80px]'>
					<Link className='text-slate-800 font-bold cursor-pointer' to={'/'}>
						<img
							src={NiMFID}
							alt="NiMFID"
							className=''
						/>
					</Link>

					<ul className='flex items-center space-x-9'>
						<Link to={'/login'} className='flex'>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0F766E" className="w-6 h-6">
								<path fillRule='evenodd'
									d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
									clipRule='evenodd' />
							</svg>
							<a className='text-sm font-bold text-primary-1'>Login</a>
						</Link>
						<Link to={'/signup'} className='flex bg-white border-2 border-primary-1 p-2 gap-2 rounded-sm'>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth='2'
								stroke="#0F766E" class="w-6 h-6">
								<path strokeLinecap='round' strokeLinejoin='round'
									d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
							</svg>
							<a className='text-sm font-bold  text-primary-1 mr-1'>Register</a>
						</Link>
					</ul>
				</nav>
			</div>

			<div className='flex flex-col justify-between items-center h-screen bg-background md:flex-row md:w-full font-poppins'>

				{email_availability?.statusCode !== 200 && (
					<div className="border border-slate-400 p-8 w-[400px] mx-auto my-10 bg-white">
						<h1 className='text-[20px] font-normal'>Welcome!</h1>

						<div className="my-10">
							<h1 className="text-[20px] font-medium">Sign up</h1>
						</div>

						<form onSubmit={handleEmailCheck}>
							<div className="mb-6">
								<label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
								<input
									type="email"
									name="email"
									onChange={handleChange}
									className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-3"
								/>
							</div>

							<button
								type="submit"
								className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium text-sm w-full px-5 py-3 text-center"
							>
								Next
							</button>
							<div className="mt-5 flex flex-col items-center justify-center text-sm">
								<div className="">
									<Link to={'/verify-account'} className="text-sky-600">&nbsp; Verify your account here!</Link>
								</div>
								<div className="">
									or
								</div>
								<div className="">
									Already have an account?
									<Link to={'/login'} className="text-red-500">&nbsp;Login here</Link>
								</div>
							</div>

						</form>
					</div>
				)}

				{email_availability?.statusCode === 200 && (
					<div className="border border-slate-400 px-5 py-1 w-[800px] mx-auto my-3 bg-white">
						<div className="my-2">
							<h1 className="text-[20px] font-medium">Sign up</h1>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="flex space-x-5 items-start w-full">
								<div>
									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">First Name</label>
										<input
											type="text"
											name="firstName"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>
									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">Last Name</label>
										<input
											type="text"
											name="lastName"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>
									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">Phone</label>
										<input
											type="number"
											name="phoneNumber"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>

									<div className="relative mb-2">
										<label className="block text-sm font-medium text-gray-900">Password</label>
										<input
											type={config.showPassword ? "text" : "password"}
											name="password"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 pr-6 py-2"
										/>
										<FaEye
											className={`absolute right-4 bottom-4 cursor-pointer ${config.showPassword ? 'text-sky-600' : 'text-gray-800'}`}
											onClick={() => setConfig({ ...config, showPassword: !config.showPassword })}
										/>
									</div>
									<div className="relative mb-2">
										<label className="block text-sm font-medium text-gray-900">Confirm Password</label>
										<input
											type={config.showConfirmPassword ? "text" : "password"}
											name="confirm_password"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 pr-6 py-2"
										/>
										<FaEye
											className={`absolute right-4 bottom-4 cursor-pointer ${config.showConfirmPassword ? 'text-sky-600' : 'text-gray-800'}`}
											onClick={() => setConfig({ ...config, showConfirmPassword: !config.showConfirmPassword })}
										/>
									</div>

									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">City</label>
										<input
											type="text"
											name="city"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>
								</div>

								<div>

									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">House No</label>
										<input
											type="text"
											name="houseNo"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>

									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">Address</label>
										<input
											type="text"
											name="streetName"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>

									<div className="mb-2">
										<label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-900">Date of Birth</label>
										<input
											type="date"
											name="dateOfBirth"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
										/>
									</div>
									<div className="mb-2">
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">State</label>
										<select
											type="text"
											name="state"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
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
										<label htmlFor="email" className="block text-sm font-medium text-gray-900">Local Government Area</label>
										<select
											type="text"
											name="lga"
											onChange={handleChange}
											className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
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

									<div className="flex items-center space-x-5 mt-3">
										<div>
											<label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-900 mb-2">Male</label>
											<input
												type="radio"
												name="gender"
												value='MALE'
												onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
												className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
											/>
										</div>
										<div>
											<label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-900 mb-2">Female</label>
											<input
												type="radio"
												name="gender"
												value='FEMALE'
												onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
												className="border border-gray-300 text-gray-900 text-lg  focus:outline-none focus:ring-teal-500 focus:border-teal-600 block w-full pl-5 px-2.5 py-1"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col justify-between items-center mt-2">
								<button
									type="submit"
									className="w-[400px] text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium  text-sm px-5 py-3 text-center"
								>
									Submit
								</button>
								<div className="mt-2 flex items-center justify-center text-sm">
									Already have an account?
									<Link to={'/login'} className="text-sky-500 text-sm">&nbsp;Login here</Link>
								</div>

							</div>
						</form>

					</div>
				)}
			</div>
		</div>
	)
}

export default Signup