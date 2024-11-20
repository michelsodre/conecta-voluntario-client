import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { GlobalContext } from '../../context'

function User() {
    //Context
    const context = useContext(GlobalContext)
    const { loggedUser } = context
    //States
    const [listCandidaturas, setListCandidaturas] = useState([])
    const [listWorkDetails, setListWorkDetails] = useState([])
    //Functions
    function dataToString(params) {
        const date = new Date(Date.parse(params)).toLocaleDateString()
        return date
    }
    ////Lista de candidaturas do usuário
    async function candidaturas() {
        const request = `http://localhost:5000/api/addition/myadditions?id_voluntary=${loggedUser._id}`
        const response = await fetch(request)
        const data = await response.json()
        setListCandidaturas(data.myAdditions)
    }
    ////Detalhes da candidatura do usuário
    async function workDetails(id_work) {
        const request = `http://localhost:5000/api/work/awork?_id=${id_work}`
        const response = await fetch(request)
        const data = await response.json()
        const work = data.aWork

        setListWorkDetails((listaAtual) => [...listaAtual, work])
    }
    //UseEffects
    useEffect(() => {
        candidaturas()
    }, [])
    ////Buscar detalhes de cada trabalho após carregar a lista de candidaturas
    useEffect(() => {
        if (listCandidaturas.length > 0) {
            listCandidaturas.forEach((candidatura) => {
                workDetails(candidatura.id_work)
            });
        }
    }, [listCandidaturas])

    return (
        <>
            <div className='userContainer'>
                <div className='userImg'>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-user-icon-download-in-svg-png-gif-file-formats--profile-avatar-account-person-app-interface-pack-icons-1401302.png?f=webp&w=256" alt="" />
                </div>
                <h1>{loggedUser.name}</h1>
                <p>Data de nascimento: {dataToString(loggedUser.birth_date)}</p>
                <p>E-mail: {loggedUser.email}</p>
                <p>Telefone: {loggedUser.phone}</p>
                <h1>Candidaturas</h1>
                {listCandidaturas && listCandidaturas.length
                    ? (listCandidaturas.map((item, index) =>
                    (<div key={index} className='cardCandidatura'>
                        <div>{listWorkDetails[index]?.title}</div>
                        <div>Status: {item.status}</div>
                        <div>Data Candidatura:{dataToString(listWorkDetails[index]?.creation_date)}</div>
                        <div>Descrição: {listWorkDetails[index]?.description}</div>
                    </div>)))
                    : (<p>Sem candidaturas</p>)
                }
            </div>
        </>

    )
}

export default User