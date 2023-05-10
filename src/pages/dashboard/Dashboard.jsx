import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Modals, SideBar, TopBar } from '../../components'
import { AdminOverview, AdminOrganizations, AdminUsers, Profile, UserOverview, UserOrganizations } from '../'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()

    const [showAuthModal, setShowAuthModal] = useState(false)
    const [activeLink, setActiveLink] = useState()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (user?.userRoles?.includes('MEMBER_USER')) {
            setActiveLink('User Overview')
        }
        if (!user?.userRoles) {
            setActiveLink('Admin Overview')
        }
    }, [user])

    return (
        <div className='relative flex flex-row font-poppins'>
            {/* modals */}
            <Modals />

            {/* sidebar */}
            <SideBar
                activeLink={activeLink}
                setActiveLink={setActiveLink}
            />

            {/* body */}
            <div className="w-full flex flex-col">
                <TopBar
                    activeLink={activeLink}
                    showAuthModal={showAuthModal}
                />

                <div className="p-2" onClick={() => setShowAuthModal(!showAuthModal)}>

                    {/* admin pages */}
                    {activeLink === 'Admin Overview' && <AdminOverview />}
                    {activeLink === 'Admin Users' && <AdminUsers />}
                    {activeLink === 'Admin Organizations' && <AdminOrganizations />}
                    {activeLink === 'Profile' && <Profile />}

                    {/* user pages */}
                    {activeLink === 'User Overview' && <UserOverview />}
                    {activeLink === 'User Organizations' && <UserOrganizations />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard