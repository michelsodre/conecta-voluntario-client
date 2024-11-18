import { createContext, useState } from "react";
//Create Global Context
export const GlobalContext = createContext(null)
//Create Global State
export default function GlobalState({ children }) {
    const [loggedUser, setLoggedUser] = useState()
    const [isOng, setIsOng] = useState(false)
    //
    return (
        <GlobalContext.Provider
            value={{ loggedUser, setLoggedUser, isOng, setIsOng }}>
            {children}
        </GlobalContext.Provider>)
}

