import { Fragment } from "react"
import AdminViewOrganizationModal from "../modals/admin/AdminViewOrganizationModal"

import UpdatePasswordModal from "../modals/UpdatePasswordModal"
import UserAddOrganizationModal from "../modals/user/UserAddOrganizationModal"
import UserDeleteOrganizationModal from "../modals/user/UserDeleteOrganizationModal"
import UserUpdateOrganizationModal from "../modals/user/UserUpdateOrganizationModal "
import UserViewOrganizationModal from "../modals/user/UserViewOrganizationModal"


const FormModal = (props) => {
	return (
		<Fragment>
			{props.type === 'admin__vieworganization__modal' && (
				<AdminViewOrganizationModal />
			)}

			{props.type === 'user__addorganization__modal' && (
				<UserAddOrganizationModal />
			)}

			{props.type === 'user__vieworganization__modal' && (
				<UserViewOrganizationModal />
			)}

			{props.type === 'user__updateorganization__modal' && (
				<UserUpdateOrganizationModal />
			)}

			{props.type === 'user__deleteorganization__modal' && (
				<UserDeleteOrganizationModal />
			)}

			{props.type === 'user__updatepassword__modal' && (
				<UpdatePasswordModal />
			)}
		</Fragment >
	)
}

export default FormModal