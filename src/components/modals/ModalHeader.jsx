import React from 'react'

const ModalHeader = ({ type, title, modalHandler }) => {
    return (
        <div className="flex justify-between items-center">
            <h4 className={`${type === 1 ? 'text-teal-600' : type === 2 ? 'text-slate-600' : type === 3 ? 'text-red-600' : 'text-sky-600 '} text-[18px] font-medium`}>
                {title}
            </h4>
            <p
                className="text-red-600 font-medium cursor-pointer"
                onClick={modalHandler}
            >x</p>
        </div>
    )
}

export default ModalHeader