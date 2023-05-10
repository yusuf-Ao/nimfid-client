import React from 'react'
import { Link } from 'react-router-dom'

import { BusinessPlan1, BusinessPlan2, LandingHeader, NiMFID } from '../../assets'
import { business__plans__1, business__plans__2 } from '../../data'


const Landing = () => {
	return (
		<div className='font-poppins'>
			<div class="bg-white h-16">
				<nav class="flex justify-between py-3 px-[80px]">
					<Link class="text-slate-800 font-bold cursor-pointer" to={'/'}>
						<img
							src={NiMFID}
							alt="NiMFID"
							className=''
						/>
					</Link>

					<ul class="flex items-center space-x-9">
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

			<div className="space-y-10">
				<div className="md:h-[100vh] pl-[80px] flex flex-wrap justify-between items-center">
					<div className="flex flex-col space-y-10 md:w-[35%]">
						<h1 className='text-[30px] md:text-[40px] text-primary-2 font-bold'>Nigeria Microfinance Institution Directory</h1>
						{/* <p>Leading digital agency with solid design and development expertise. We build readymade websites, mobile applications, and elaborate online business services.</p> */}
						<Link to={'/public-search'} className="w-fit p-0">
							<button type="submit"
								className='transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-111  duration-300 relative py-6 pl-3 text-white h-14 w-fit bg-white font-medium rounded-md text-sm text-center inline-flex items-center mr-2 border-1 border-primary-1 drop-shadow-lg shadow-md shadow-green-900/50'>
								<div class="flex  inset-y-0 left-0 items-center pl-2 pointer-events-none">
									<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
									<a className='ml-4 text-gray-500 font-medium'>Public Search Area</a>

									<svg class="inline ml-10 mr-4 w-6 h-6 text-gray-300 animate-spin fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
										<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
									</svg>
								</div>

							</button>
						</Link>
					</div>

					<div className="md:w-[60%] h-[80%]">
						<img
							src={LandingHeader}
							alt=""
							className='w-full h-full'
						/>

					</div>
				</div>

				<div className="px-[80px] flex flex-wrap justify-between items-center">
					<div className="flex flex-col space-y-10 md:w-[35%]">
						<h1 className='text-[35px] text-slate-700 font-medium'>How can we help your Business ?</h1>
						<p>We build readymade websites, mobile applications, and elaborate online business services.</p>
					</div>
					<div className="md:w-[60%] flex flex-wrap justify-between items-center">
						<div className="flex flex-col space-y-8 mt-[100px]">
							{business__plans__1.map(item => (
								<div
									key={item.id}
									className="p-4 w-[280px] rounded-lg shadow-lg flex flex-col justify-center items-center space-y-2"
								>
									<img
										src={item.image}
										alt=""
										className='w-[50%]'
									/>
									<h1 className='text-[20px] text-slate-700 font-medium text-center'>{item.title}</h1>
									<p className='text-[14px] text-center'>{item.description}</p>
								</div>
							))}
						</div>
						<div className="flex flex-col space-y-8">
							{business__plans__2.map(item => (
								<div
									key={item.id}
									className="p-4 w-[280px] rounded-lg shadow-lg flex flex-col justify-center items-center space-y-2"
								>
									<img
										src={item.image}
										alt=""
										className='w-[50%]'
									/>
									<h1 className='text-[20px] text-slate-700 font-medium text-center'>{item.title}</h1>
									<p className='text-[14px] text-center'>{item.description}</p>
								</div>
							))}
						</div>

					</div>
				</div>


				<div className="h-[300px] px-[80px] py-5 flex flex-wrap justify-between items-center bg-teal-700 text-white">
					<div className="flex flex-col space-y-2 w-[300px]">
						<h1 className='font-bold '>NIMFID</h1>
						<p className='text-[14px] font-normal'>Leading digital agency with solid design and development expertise. We build readymade websites, mobile applications, and elaborate online business services.</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h1 className='font-bold '>Company</h1>
						<ul className='list-none'>
							<li className='text-[14px] font-medium'>About Us</li>
							<li className='text-[14px] font-medium'>Career</li>
							{/* <li></li> */}
						</ul>
					</div>
					<div className="flex flex-col space-y-2">
						<h1 className='font-bold '>Support</h1>
						<ul className='list-none'>
							<li className='text-[14px] font-medium'>FAQ</li>
							<li className='text-[14px] font-medium'>Policy</li>
							<li className='text-[14px] font-medium'>Business</li>
							{/* <li></li> */}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing