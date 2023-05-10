import React, { useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import { GrFormNext } from 'react-icons/gr'
import { BsCardChecklist } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { PageTitle } from '../../components'
import { getDashboardInfo } from '../../state/actions/admin.actions'


const AdminOverview = () => {
	const dispatch = useDispatch()

	const { dashboard_info } = useSelector(state => state.admin)

	useEffect(() => {
		dispatch(getDashboardInfo())
	}, [])

	return (
		<div>
			<PageTitle type={'admin-overview'} />

			<div className="px-2 flex flex-wrap justify-between h-[150px] items-center">
				<div className="mt-8 border-t border-l border-r rounded w-[300px] cursor-pointer shadow-green-200 shadow-lg hover:shadow-green-300 hover:translate-x-1 ease-in-out duration-500">
					<div className="flex flex-col h-[150px] justify-between">
						<div className="py-4 flex flex-col items-center">
							<BsCardChecklist
								className='text-green-600'
							/>

							<p className='text-[18px] text-dark-blue'>Organizations</p>
							<h4 className='text-[20px] text-dark-blue font-bold'>{dashboard_info?.totalNumberOfOrganizations}</h4>
						</div>

						<div className="text-[14px] text-slate-800 py-2 font-normal flex justify-center items-center bg-green-200 w-full">
							View Detailed Report <span className="flex space-x-[-10px]"><GrFormNext /><GrFormNext /><GrFormNext /></span>
						</div>
					</div>
				</div>


				<div className="mt-8 border-t border-l border-r rounded w-[300px] cursor-pointer shadow-yellow-200 shadow-lg hover:shadow-yellow-300 hover:translate-x-1 ease-in-out duration-500">
					<div className="flex flex-col h-[150px] justify-between">
						<div className="py-4 flex flex-col items-center">
							<BsCardChecklist
								className='text-yellow-600'
							/>

							<p className='text-[18px] text-dark-blue'>Active Organizations</p>
							<h4 className='text-[20px] text-dark-blue font-bold'>{dashboard_info?.numberOfActiveOrgs}</h4>
						</div>

						<div className="text-[14px] text-slate-800 py-2 font-normal flex justify-center items-center bg-yellow-200 w-full">
							View Detailed Report <span className="flex space-x-[-10px]"><GrFormNext /><GrFormNext /><GrFormNext /></span>
						</div>
					</div>
				</div>

				<div className="mt-8 border-t border-l border-r rounded w-[300px] cursor-pointer shadow-purple-200 shadow-lg hover:shadow-purple-300 hover:translate-x-1 ease-in-out duration-500">
					<div className="flex flex-col h-[150px] justify-between">
						<div className="py-4 flex flex-col items-center">
							<BsCardChecklist
								className='text-purple-600'
							/>

							<p className='text-[18px] text-dark-blue'>Inative Organizations</p>
							<h4 className='text-[20px] text-dark-blue font-bold'>{dashboard_info?.numberOfInactiveOrgs}</h4>
						</div>

						<div className="text-[14px] text-slate-800 py-2 font-normal flex justify-center items-center bg-purple-200 w-full">
							View Detailed Report <span className="flex space-x-[-10px]"><GrFormNext /><GrFormNext /><GrFormNext /></span>
						</div>
					</div>
				</div>
				
				<div className="mt-8 border-t border-l border-r rounded w-[300px] cursor-pointer shadow-blue-200 shadow-lg hover:shadow-blue-300 hover:translate-x-1 ease-in-out duration-500">
					<div className="flex flex-col h-[150px] justify-between">
						<div className="py-4 flex flex-col items-center">
							<FiUsers
								className='text-blue-600'
							/>

							<p className='text-[18px] text-dark-blue'>Total Users</p>
							<h4 className='text-[20px] text-dark-blue font-bold'>{dashboard_info?.totalNumberOfUsers}</h4>
						</div>

						<div className="text-[14px] text-slate-800 py-2 font-normal flex justify-center items-center bg-blue-200 w-full">
							View Detailed Report <span className="flex space-x-[-10px]"><GrFormNext /><GrFormNext /><GrFormNext /></span>
						</div>
					</div>
				</div>
				
				<div className="mt-8 border-t border-l border-r rounded w-[300px] cursor-pointer shadow-sky-200 shadow-lg hover:shadow-sky-300 hover:translate-x-1 ease-in-out duration-500">
					<div className="flex flex-col h-[150px] justify-between">
						<div className="py-4 flex flex-col items-center">
							<FiUsers
								className='text-sky-600'
							/>

							<p className='text-[18px] text-dark-blue'>Active Users</p>
							<h4 className='text-[20px] text-dark-blue font-bold'>{dashboard_info?.numberOfActiveUsers}</h4>
						</div>

						<div className="text-[14px] text-slate-800 py-2 font-normal flex justify-center items-center bg-sky-200 w-full">
							View Detailed Report <span className="flex space-x-[-10px]"><GrFormNext /><GrFormNext /><GrFormNext /></span>
						</div>
					</div>
				</div>
				
				<div className="mt-8 border-t border-l border-r rounded w-[300px] cursor-pointer shadow-orange-200 shadow-lg hover:shadow-orange-300 hover:translate-x-1 ease-in-out duration-500">
					<div className="flex flex-col h-[150px] justify-between">
						<div className="py-4 flex flex-col items-center">
							<FiUsers
								className='text-orange-600'
							/>

							<p className='text-[18px] text-dark-blue'>Inactive Users</p>
							<h4 className='text-[20px] text-dark-blue font-bold'>{dashboard_info?.numberOfInactiveUsers}</h4>
						</div>

						<div className="text-[14px] text-slate-800 py-2 font-normal flex justify-center items-center bg-orange-200 w-full">
							View Detailed Report <span className="flex space-x-[-10px]"><GrFormNext /><GrFormNext /><GrFormNext /></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminOverview