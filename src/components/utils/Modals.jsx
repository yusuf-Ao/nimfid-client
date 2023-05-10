import React, { Fragment } from 'react'

import { useStateContext } from '../../state/context'
import FormModal from './FormModal'


const Modals = () => {
    const { modals } = useStateContext()

    return (
        <Fragment>
            {modals.showAdminViewOrganizationModal && (
                <FormModal
                    type="admin__vieworganization__modal"
                />
            )}

            {modals.showUserAddOrganizationModal && (
                <FormModal
                    type="user__addorganization__modal"
                />
            )}

            {modals.showUserViewOrganizationModal && (
                <FormModal
                    type="user__vieworganization__modal"
                />
            )}

            {modals.showUserUpdateOrganizationModal && (
                <FormModal
                    type="user__updateorganization__modal"
                />
            )}

            {modals.showUserDeleteOrganizationModal && (
                <FormModal
                    type="user__deleteorganization__modal"
                />
            )}

            {modals.showUpdatePasswordModal && (
                <FormModal
                    type="user__updatepassword__modal"
                />
            )}
        </Fragment>
    )
}

export default Modals