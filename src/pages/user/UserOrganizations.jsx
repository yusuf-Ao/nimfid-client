import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getOrganizations } from '../../state/actions/user.actions'
import { PageTitle, UserOrganizationsTable } from '../../components'


const UserOrganizations = () => {
	const dispatch = useDispatch()

	const { new_organization, organizations } = useSelector(state => state.user)

	const [currentPageFetch, setCurrentPageFetch] = useState(0)

	useEffect(() => {
		dispatch(getOrganizations({ current_page: currentPageFetch }))
	}, [new_organization, currentPageFetch])

	return (
		<div>
			<PageTitle type="user-organizations" />

			<div className="space-y-5 px-2 mt-5">
				<UserOrganizationsTable
					data={organizations}
					currentPageFetch={currentPageFetch}
					setCurrentPageFetch={setCurrentPageFetch}
				/>
			</div>
		</div>
	)
}

export default UserOrganizations