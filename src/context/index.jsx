import { createContext, useEffect, useState } from "react";
//Create Global Context
export const GlobalContext = createContext(null)
//Create Global State
export default function GlobalState({ children }) {
    //State Voluntário
    const [loggedUser, setLoggedUser] = useState({ birth_date: "", email: "", name: "", phone: "", _id: "" })
    const [listCandidaturas, setListCandidaturas] = useState([])
    //State ONG
    const [loggedOng, setLoggedOng] = useState({ name: "", phone: "", email: "", description: "" })
    const [isOng, setIsOng] = useState(false)
    //State Condicional de Login
    const [isLogged, setIsLogged] = useState(false)
    //

    ////Lista de candidaturas do usuário
    async function refreshAdditionList() {
        const request = `http://localhost:5000/api/addition/myadditions?id_voluntary=${loggedUser._id}`
        const response = await fetch(request)
        const data = await response.json()
        setListCandidaturas(data.myAdditions)
    }
    useEffect(() => {
        if (loggedUser._id) {
            refreshAdditionList()
        }
    }, [loggedUser._id])


    return (
        <GlobalContext.Provider
            value={{ loggedUser, setLoggedUser, listCandidaturas, setListCandidaturas, isOng, setIsOng, isLogged, setIsLogged }}>
            {children}
        </GlobalContext.Provider>)
}

