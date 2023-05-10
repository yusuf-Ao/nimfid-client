import React from 'react'
import { useSelector } from 'react-redux'

import { IconSettings, IconOverview, IconUser, IconUsers, IconCompany } from '../../assets'
import { menus__memberuser, menus__systemuser } from '../../data'


const SideBar = ({ activeLink, setActiveLink }) => {

    const { user } = useSelector(state => state.auth)

    return (
        <div className='min-w-72 w-72 h-screen bg-slate-800 duration-500 p-5 pt-4 sticky top-0 left-0'>
            <div className="flex items-center space-x-8 font-roboto">
                <img
                    src={IconSettings}
                    alt="icon"
                    className='w-[35px]'
                />

                <h1 className='text-white font-bold'>NIMFID</h1>
            </div>

            <div className="flex flex-col mt-10">
                <ul className='pt-6 relative space-y-10'>
                    {user?.userRoles?.includes('MEMBER_USER') && menus__memberuser?.map((menu, index) => (
                        <li
                            key={`${index}`}
                            className={`text-gray-300 text-[12px] grid grid-cols-2 items-center space-x-[-4em] cursor-pointer px-4 py-6 hover:bg-gray-500 mt-4 ${activeLink === menu.title && 'bg-gray-500'}`}
                            onClick={() => setActiveLink(menu.title)}
                        >
                            <img src={menu.icon} className='text-red-400' alt="" />
                            <span className='uppercase font-medium origin-left duration-200 text-[12px]'>{menu.title === 'User Overview' ? 'Overview' : menu.title === 'User Users' ? 'Users' : menu.title === 'User Organizations' ? 'Organizations' : menu.title}</span>
                        </li>
                    ))}

                    {!user?.userRoles && menus__systemuser?.map((menu, index) => (
                        <li
                            key={`${index}`}
                            className={`text-gray-300 text-[12px] grid grid-cols-2 items-center space-x-[-4em] cursor-pointer px-4 py-6 hover:bg-gray-500 mt-4 ${activeLink === menu.title && 'bg-gray-500'}`}
                            onClick={() => setActiveLink(menu.title)}
                        >
                            <img src={menu.icon} className='text-red-400' alt="" />
                            <span className='uppercase font-medium origin-left duration-200 text-[12px]'>{menu.title === 'Admin Overview' ? 'Overview' : menu.title === 'Admin Users' ? 'Users' : menu.title === 'Admin Organizations' ? 'Organizations' : menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SideBar