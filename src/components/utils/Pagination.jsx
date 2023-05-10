/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'


const Pagination = ({ data, setCurrentData }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)

    // page limiters
    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    const pages = []

    for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    useEffect(() => {
        setCurrentData(data?.slice(indexOfFirstItem, indexOfLastItem))
    }, [data, indexOfFirstItem, indexOfLastItem])

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id))
    }


    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1)


        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1)

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
                            size={30}
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
                                    className={`flex items-center cursor-pointer text-[14px] px-3 h-[35px] rounded-lg ${currentPage === page ? 'border border-sky-200 bg-sky-200 text-sky-600 font-bold' : 'border border-sky-600 text-sky-600 font-medium'}`}
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
                            size={30}
                        />
                    </button>

                </ul>
            )}
        </div>
    )
}

export default Pagination