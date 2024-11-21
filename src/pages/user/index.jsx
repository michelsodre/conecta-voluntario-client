import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { GlobalContext } from '../../context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function User() {
    //Context
    const context = useContext(GlobalContext)
    const { setLoggedUser, setIsLogged, loggedUser, setIsOng, listCandidaturas, setListCandidaturas } = context
    //States
    const [listWorkDetails, setListWorkDetails] = useState([])
    const navigate = useNavigate()
    //Functions
    function dataToString(params) {
        const date = new Date(Date.parse(params)).toLocaleDateString()
        return date
    }
    ////Detalhes da candidatura do usuário
    async function workDetails(id_work) {
        const request = `http://localhost:5000/api/work/awork?_id=${id_work}`
        const response = await fetch(request)
        const data = await response.json()
        const work = data.aWork

        setListWorkDetails((listaAtual) => [...listaAtual, work])
    }
    ////Remover Candidatura
    async function removeAddition(additionId) {
        await axios.delete(`http://localhost:5000/api/addition/delete/${additionId}`)
        await refreshData()
    }
    ////Atulizar página
    async function refreshData() {
        const request = `http://localhost:5000/api/addition/myadditions?id_voluntary=${loggedUser._id}`
        const response = await fetch(request)
        const data = await response.json()
        setListCandidaturas(data.myAdditions)
    }
    ////Deletar Conta do usuário
    async function DeleteUser() {
        try {
            //deletear todas as inscrições em vagas
            await axios.delete(`http://localhost:5000/api/addition/deletemany/${loggedUser._id}`)
            await axios.delete(`http://localhost:5000/api/voluntary/delete/${loggedUser._id}`)

        } catch (error) {
            console.log(error);

        }
        await setLoggedUser({ birth_date: "", email: "", name: "", phone: "", _id: "" })
        await setIsLogged(false)
        await setIsOng(false)
        navigate('/')
    }

    ////Buscar detalhes de cada trabalho após carregar a lista de candidaturas
    useEffect(() => {
        if (listCandidaturas.length > 0) {
            listCandidaturas.forEach((candidatura) => {
                workDetails(candidatura.id_work)
            });
        }
    }, [listCandidaturas])
    ////condicional caso tentativa de acesso sem login
    useEffect(() => {
        if (!loggedUser._id) {
            navigate('/');
        }
    }, [loggedUser]);


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
                <button onClick={() => DeleteUser()}>Deletar Conta</button>
                <h1>Candidaturas</h1>
                {listCandidaturas && listCandidaturas.length
                    ? (listCandidaturas.map((item, index) =>
                    (<div key={index} className='cardCandidatura'>
                        <div>{listWorkDetails[index]?.title}</div>
                        <div>Status: {item.status}</div>
                        <div>Data Candidatura:{dataToString(listWorkDetails[index]?.creation_date)}</div>
                        <div>Descrição: {listWorkDetails[index]?.description}</div>
                        <button onClick={() => removeAddition(item._id)}>Remover Candidatura</button>
                    </div>)))
                    : (<p>Sem candidaturas</p>)
                }
            </div >
        </>

    )
}

export default User