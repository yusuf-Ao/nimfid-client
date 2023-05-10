/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { getOrganizations } from '../../state/actions/user.actions'


const PagePagination = ({ data, setCurrentPageFetch }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)

    // page limiters
    const [pageNumberLimit, setPageNumberLimit] = useState(1)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    const pages = []

    for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    // useEffect(() => {
    //     setCurrentData(data?.slice(indexOfFirstItem, indexOfLastItem))
    // }, [data, indexOfFirstItem, indexOfLastItem])

    const handleClick = (e) => {
        // console.log('::current page ', Number(e.target.id))
        setCurrentPage(Number(e.target.id))
        setCurrentPageFetch(Number(e.target.id) - 1)
    }


    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1)
        console.log(currentPage - 2, ':: current page')
        setCurrentPageFetch(currentPage - 2)

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1)
        console.log(currentPage, ':: current page')
        setCurrentPageFetch(currentPage)

        if ((currentPage + 1) > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    let pageDecrementBtn = null
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li className='cursor-pointer' onClick={handlePreviousClick}>&hellip;</li>
    }

    let pageIncrementBtn = null
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li className='cursor-pointer' onClick={handleNextClick}>&hellip;</li>
    }

    return (
        <div className='flex justify-start w-full bg-white'>
            {data?.length > 0 && (
                <ul className='flex justify-center mt-5 space-x-1'>

                    <button
                        onClick={handlePreviousClick}
                        disabled={currentPage === pages[0]}
                        className='bg-white text-slate-400 text-[12px] hover:text-slate-600 cursor-pointer hover:-translate-x-1 duration-[800ms] ease-in-out'
                    >
                        <AiFillCaretLeft
                            size={25}
                        />
                    </button>

                    {pageDecrementBtn}

                    {pages?.map((page, index) => (
                        <div key={index}>
                            {page < maxPageNumberLimit + 1 && page > minPageNumberLimit && (
                                <li
                                    key={index}
                                    id={page}
                                    onClick={handleClick}
                                    className={`flex items-center cursor-pointer text-[12px] px-2 h-[25px] rounded-lg ${currentPage === page ? 'border border-sky-200 bg-sky-200 text-sky-600 font-bold' : 'border border-sky-600 text-sky-600 font-medium'}`}
                                >{page}</li>
                            )}
                        </div>
                    ))}

                    {pageIncrementBtn}

                    <button
                        onClick={handleNextClick}
                        disabled={currentPage === pages[pages.length - 1]}
                        className='bg-white text-slate-400 text-[12px] hover:text-slate-600 cursor-pointer hover:translate-x-1 duration-[800ms] ease-in-out'
                    >
                        <AiFillCaretRight
                            size={25}
                        />
                    </button>
                </ul>
            )}
        </div>
    )
}

export default PagePagination