import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Landing, Login, Signup, NotFound, Dashboard, VerifyAccount, ResendCode, ForgotPassword, UpdatePassword, AdminLogin, PublicLookup, } from './pages'


function App() {

	return (
		<BrowserRouter>
			<ToastContainer />

			<Routes>
				{/* landing page */}
				<Route path='/' element={<Landing />} />

				<Route path='/public-search' element={<PublicLookup />} />

				{/* auth */}
				<Route path='/login' element={<Login />} />
				<Route path='/admin' element={<AdminLogin />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/update-password/:email' element={<UpdatePassword />} />
				<Route path='/resend-code' element={<ResendCode />} />
				<Route path='/verify-account' element={<VerifyAccount />} />

				<Route path='/dashboard' element={<Dashboard />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
