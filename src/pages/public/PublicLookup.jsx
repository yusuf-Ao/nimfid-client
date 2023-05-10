import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import SwitchSelector from "react-switch-selector"
import { Wrapper } from "@googlemaps/react-wrapper"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { NiMFID } from '../../assets'
import Map from '../../components/map/Map'
import Marker from '../../components/map/Marker'
import { states, toggle_options } from '../../data'
import { getPublicRecord } from '../../state/actions/auth.actions'
import PublicSearchTable from '../../components/tables/PublicSearchTable'


const PublicLookup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { search_data } = useSelector(state => state.auth)

    const [currentPageFetch, setCurrentPageFetch] = useState(0)
    const [mapView, setMapView] = useState(true)
    const [resetForm, setResetForm] = useState(false)
    const [submitForm, setSubmitForm] = useState(true)
    const [formData, setFormData] = useState({ showMap: mapView, query: '', location: [], orgTypes: [], categories: [] })

    const orgRef = useRef([])
    const catRef = useRef([])

    const [clicks, setClicks] = React.useState([]);
    const [zoom, setZoom] = React.useState(6.5); // initial zoom
    const [center, setCenter] = React.useState({
        lat: 9.0820,
        lng: 8.6753,
    });

    const onMapClick = (e) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng]);
    };

    const onMapIdle = (m) => {
        //console.log("onIdle");
        setZoom(m.getZoom());
        setCenter(m.getCenter().toJSON());
    };

    const renderMap = (status) => {
        return <span className='text-center text-gray-500'>
            <p className='py-[30vh] text-3xl font-medium'>Map Status is: {status}</p>
        </span>;
    };

    useEffect(() => {
        dispatch(getPublicRecord({ currentPage: currentPageFetch, formData: formData, toast }))
    }, [currentPageFetch, mapView])

    useEffect(() => {
        if (resetForm) {
            dispatch(getPublicRecord({ currentPage: currentPageFetch, formData: formData, toast }))
            setResetForm(false)
        }
    }, [resetForm])

    useEffect(() => {
        setSubmitForm(true)
    }, [submitForm])

    const onViewChange = () => {
        if (mapView) {
            setFormData({ ...formData, showMap: false })
            setMapView(false)
        } else {
            setFormData({ ...formData, showMap: true })
            setMapView(true)
        }
    };

    const handleReset = () => {

        for (let i = 0; i < orgRef.current.length; i++) {
            orgRef.current[i].checked = false;
        }

        for (let i = 0; i < catRef.current.length; i++) {
            catRef.current[i].checked = false;
        }

        setFormData({
            ...formData, showMap: mapView, query: '', location: [],
            orgTypes: [], categories: []
        })

        setResetForm(true)
    }


    const handleCheckBoxChange = (e) => {
        //console.log(e)
        if (e.target.checked) {
            setFormData({ ...formData, [e.target.name]: [...formData[e.target.name], e.target.value] })
        } else {
            let index = formData[e.target.name].indexOf(e.target.value)
            formData[e.target.name].splice(index, 1)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitForm(false)
        dispatch(getPublicRecord({ currentPage: currentPageFetch, formData: formData, toast }))
        setFormData({ ...formData, query: '' })
    }


    return (
        <div className='font-poppins flex flex-col bg-background h-screen pb-2 overflow-y-hidden'>
            <div className='sticky top-0 left-0 bg-white h-16 drop-shadow-md'>
                <nav className='flex justify-between py-3 px-[80px]'>
                    <Link className='text-slate-800 font-bold cursor-pointer' to={'/'}>
                        <img
                            src={NiMFID}
                            alt="NiMFID"
                            className=''
                        />
                    </Link>

                    <ul className='flex items-center space-x-9'>
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

            <main class="grid grid-cols-4 h-screen mt-4 gap-4">
                <div class="flex flex-col col-span-1 h-fit bg-white ml-4 px-2 pt-2">
                    <form
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                    >
                        <div class="p-4 h-8 mb-4 mt-4 w-full flex items-center">
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    name='query'
                                    value={formData.query}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-background dark:border-blue-800 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Name"
                                />
                            </div>
                            <button
                                type="submit"
                                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>

                        </div>

                        <div class="p-4 h-fit  w-full ">
                            <div class="mt-3 h-fit">
                                <div class="flex gap-2">
                                    <span class="text-gray-700 font-medium">Location</span>
                                    <select
                                        type="text"
                                        name="location"
                                        onChange={handleChange}
                                        className="border border-gray-300 text-gray-900 text-lg  focus:outline-none block w-full pl-5 px-2.5 py-1"
                                    >
                                        <option value="">---</option>
                                        {states?.map(state => (
                                            <option
                                                key={state}
                                                value={state}
                                            >{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div class="h-auto mt-6">
                                <div>
                                    <h1 class="text-gray-700 font-medium">Organization Type</h1>
                                </div>
                                <div class="p-2 flex flex-col gap-2">
                                    <div class="flex items-center mr-4">
                                        <input id="mfi" type="checkbox"
                                            value='MFI'
                                            name='orgTypes'
                                            ref={(element) => { orgRef.current[0] = element }}
                                            onChange={handleCheckBoxChange} class="w-4 h-4"></input>
                                        <label for="mfi" class="ml-2 text-sm font-normal text-gray-800">MFI</label>
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="ngo" type="checkbox"
                                            value="NGO"
                                            name='orgTypes'
                                            ref={(element) => { orgRef.current[1] = element }}
                                            onChange={handleCheckBoxChange} class="w-4 h-4"></input>
                                        <label for="ngo" class="ml-2 text-sm font-normal text-gray-800">NGO</label>
                                    </div>
                                    <div class="flex items-center mr-4">
                                        <input id="cooperative" type="checkbox" value="COOPERATIVE"
                                            name='orgTypes'
                                            ref={(element) => { orgRef.current[2] = element }}
                                            onChange={handleCheckBoxChange} class="w-4 h-4"></input>
                                        <label for="cooperative"
                                            class="ml-2 text-sm font-normal text-gray-800">COOPERATIVE</label>
                                    </div>
                                </div>
                            </div>

                            <div class="h-auto mt-6">
                                <div>
                                    <h1 class="text-gray-700 font-medium">Affiliation Category</h1>
                                </div>
                                <div class="p-2">
                                    <ul class="grid gap-6 w-full md:grid-cols-3">
                                        <li>
                                            <input type="checkbox" id="option-a"
                                                value="A"
                                                name='categories'
                                                ref={(element) => { catRef.current[0] = element }}
                                                onChange={handleCheckBoxChange}
                                                class="hidden peer"></input>
                                            <label for="option-a"
                                                class="inline-flex justify-between items-center p-1 w-fit rounded-sm border-[1px] border-red-500 hover:bg-red-500 cursor-pointer peer-checked:bg-red-500 peer-checked:hover:bg-red-400 text-gray-500 font-normal peer-checked:text-white">
                                                <div class="inline-flex">
                                                    <div class="w-full text-sm">A</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF"
                                                        class="w-6 h-7">
                                                        <path fill-rule="evenodd"
                                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="option-b" value="B"
                                                name='categories'
                                                ref={(element) => { catRef.current[1] = element }}
                                                onChange={handleCheckBoxChange} class="hidden peer"></input>
                                            <label for="option-b"
                                                class="inline-flex justify-between items-center p-1 w-fit rounded-sm border-[1px] border-blue-500 hover:bg-blue-500 cursor-pointer peer-checked:bg-blue-500 peer-checked:hover:bg-blue-400 text-gray-500 font-normal peer-checked:text-white">
                                                <div class="inline-flex">
                                                    <div class="w-full text-sm">B</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF"
                                                        class="w-6 h-7">
                                                        <path fill-rule="evenodd"
                                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="option-c" value="C"
                                                name='categories'
                                                ref={(element) => { catRef.current[2] = element }}
                                                onChange={handleCheckBoxChange} class="hidden peer"></input>
                                            <label for="option-c"
                                                class="inline-flex justify-between items-center p-1 w-fit rounded-sm border-[1px] border-orange-500 hover:bg-orange-500 cursor-pointer peer-checked:bg-orange-500 peer-checked:hover:bg-orange-400 text-gray-500 font-normal peer-checked:text-white">
                                                <div class="inline-flex">
                                                    <div class="w-full text-sm">C</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF"
                                                        class="w-6 h-7">
                                                        <path fill-rule="evenodd"
                                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="option-d" value="D"
                                                name='categories'
                                                ref={(element) => { catRef.current[3] = element }}
                                                onChange={handleCheckBoxChange} class="hidden peer"></input>
                                            <label for="option-d"
                                                class="inline-flex justify-between items-center p-1 w-fit rounded-sm border-[1px] border-purple-500 hover:bg-purple-500 cursor-pointer peer-checked:bg-purple-500 peer-checked:hover:bg-purple-400 text-gray-500 font-normal peer-checked:text-white">
                                                <div class="inline-flex">
                                                    <div class="w-full text-sm">D</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF"
                                                        class="w-6 h-7">
                                                        <path fill-rule="evenodd"
                                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="option-e" value="E"
                                                name='categories'
                                                ref={(element) => { catRef.current[4] = element }}
                                                onChange={handleCheckBoxChange} class="hidden peer"></input>
                                            <label for="option-e"
                                                class="inline-flex justify-between items-center p-1 w-fit rounded-sm border-[1px] border-b- border-green-500 hover:bg-green-500 cursor-pointer peer-checked:bg-green-500 peer-checked:hover:bg-green-400 text-gray-500 font-normal peer-checked:text-white">
                                                <div class="inline-flex">
                                                    <div class="w-full text-sm">E</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF"
                                                        class="w-6 h-7">
                                                        <path fill-rule="evenodd"
                                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                            <div class="flex gap-2 justify-end mt-6 h-auto">

                                <button type="reset"
                                    class="text-blue-700 bg-white hover:bg-blue-200  font-medium rounded-md text-sm px-3 py-1 text-center inline-flex items-center mr-2 border-2 border-blue-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-6 h-6">
                                        <path fill-rule="evenodd"
                                            d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Reset
                                </button>
                                <button type="submit"
                                    class="text-white bg-blue-600 hover:bg-blue-800  font-medium rounded-md text-sm px-3 py-1 text-center inline-flex items-center mr-2 border-2 border-blue-600">
                                    Apply
                                    <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </form>
                </div>


                <div class="flex flex-col h-auto col-span-3 relative overflow-y-auto">
                    {(submitForm && mapView) && (
                        // <div style={{ display: "flex", height: "100%" }}>

                        // </div>
                        <Wrapper apiKey={import.meta.env.VITE_APP_DEV_MAPS_API_KEY} render={renderMap}>
                            <Map
                                center={center}
                                onClick={onMapClick}
                                onIdle={onMapIdle}
                                zoom={zoom}
                                mapTypeId={"roadmap"}
                                streetViewControl={false}
                                mapTypeControl={false}
                                style={{ flexGrow: "1", height: "100%" }}
                            >
                                <Marker data={search_data} />
                            </Map>
                        </Wrapper>
                    )}
                    {!mapView && (
                        <PublicSearchTable
                            data={search_data}
                            setCurrentPageFetch={setCurrentPageFetch}
                        />
                    )}
                    <div class="fixed mt-2 ml-2">
                        <div className="your-required-wrapper" style={{ width: 100, height: 40 }}>
                            <SwitchSelector
                                onChange={onViewChange}
                                options={toggle_options}
                                initialSelectedIndex={0}
                                backgroundColor={"#353b48"}
                                fontColor={"#f5f6fa"}
                            />
                        </div>
                    </div>

                </div>
            </main >


        </div >
    )

}

export default PublicLookup