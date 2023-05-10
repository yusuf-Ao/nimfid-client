import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AdminUsersTable, PageTitle } from '../../components'
import { getAllUsers } from '../../state/actions/admin.actions'


const AdminUsers = () => {
	const dispatch = useDispatch()

	const { users } = useSelector(state => state.admin)

	const [currentPageFetch, setCurrentPageFetch] = useState(0)

	useEffect(() => {
		dispatch(getAllUsers({ current_page: currentPageFetch }))
	}, [currentPageFetch])

	return (
		<div>
			<PageTitle type={'admin-users'} />

			<div className="space-y-5 px-2 mt-5">
				<AdminUsersTable
					data={users}
					setCurrentPageFetch={setCurrentPageFetch}
				/>
			</div>
		</div>
	)
}

export default AdminUsers