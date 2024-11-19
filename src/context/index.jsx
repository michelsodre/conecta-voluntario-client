import { createContext, useState } from "react";
//Create Global Context
export const GlobalContext = createContext(null)
//Create Global State
export default function GlobalState({ children }) {
    const [loggedUser, setLoggedUser] = useState({ birth_date: "", email: "", name: "", phone: "", _id: "" })
    const [isOng, setIsOng] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    //
    return (
        <GlobalContext.Provider
            value={{ loggedUser, setLoggedUser, isOng, setIsOng, isLogged, setIsLogged }}>
            {children}
        </GlobalContext.Provider>)
}

