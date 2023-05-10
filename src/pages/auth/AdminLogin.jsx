import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { NiMFID } from '../../assets'

import { loginAdmin } from '../../state/actions/auth.actions'


const AdminLogin = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user } = useSelector(state => state.auth)

	const [config, setConfig] = useState({ showPassword: false })
	const [formData, setFormData] = useState({ username: '', password: '' })

	useEffect(() => {
		if (user) {
			navigate('/dashboard')
		}
	}, [user])

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		// console.log(formData)
		dispatch(loginAdmin({ formData, toast, navigate }))
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

			<div className='flex flex-col justify-center items-center my-auto h-screen bg-primary md:flex-row md:w-full font-poppins'>
				{/* <div className="hidden md:flex md:w-1/2 md:flex-col md:items-center">
				<img
					src={ArtBuilding}
					alt="image"
					className='w-[60%] bg-white'
				/>
			</div> */}

				<div className=" border border-slate-400 mx-5 px-8 py-10 md:w-[35%] bg-white">
					{/* <h1 className='text-[20px] font-normal'>Welcome!</h1> */}

					<div className="mb-5">
						<h1 className="text-[20px] font-medium capitalize">Sign in</h1>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="mb-6">
							<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
							<input
								type="text"
								name="username"
								onChange={handleChange}
								className="border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-slate-500 focus:border-slate-500 block w-full px-5 py-2"
							/>
						</div>

						<div className="relative mb-6">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Password
							</label>
							<input
								type={config.showPassword ? "text" : "password"}
								name="password"
								// placeholder='Password'
								onChange={handleChange}
								className="border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-slate-500 focus:border-slate-500 block w-full pl-5 pr-6 py-2"
							/>
							<FaEye
								className={`absolute right-4 bottom-4 cursor-pointer ${config.showPassword ? 'text-sky-600' : 'text-gray-800'}`}
								onClick={() => setConfig({ ...config, showPassword: !config.showPassword })}
							/>
						</div>

						<button
							type="submit"
							className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium text-sm w-full px-5 py-4 text-center"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AdminLogin