import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AdminOrganizationsTable, PageTitle } from '../../components'
import { getAllOrganizations } from '../../state/actions/admin.actions'


const AdminOrganizations = () => {
	const dispatch = useDispatch()

	const { organizations } = useSelector(state => state.admin)

	const [currentPageFetch, setCurrentPageFetch] = useState(0)

	useEffect(() => {
		dispatch(getAllOrganizations({current_page: currentPageFetch}))
	}, [currentPageFetch])

	return (
		<div>
			<PageTitle type={'admin-organizations'} />

			<div className="space-y-5 px-2 mt-5">
				<AdminOrganizationsTable
					data={organizations}
					setCurrentPageFetch={setCurrentPageFetch}
				/>
			</div>
		</div>
	)
}

export default AdminOrganizations