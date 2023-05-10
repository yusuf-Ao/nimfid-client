/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from 'react'

import { root__modals } from '../../data'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [modals, setModals] = useState({ ...root__modals })

    return (
        <Context.Provider value={{
            modals,
            setModals,
        }}>
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)