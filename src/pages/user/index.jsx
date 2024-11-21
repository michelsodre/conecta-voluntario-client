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
    const [editForm, setEditForm] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    //Functions
    function dataToString(params) {
        const date = new Date(params)
        return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
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
    ////Abrir Edição
    function openEdit() {
        const formatDate = new Date(loggedUser.birth_date).toISOString().split('T')[0]
        setIsEdit(!isEdit)
        setEditForm({ birth_date: formatDate, email: loggedUser.email, name: loggedUser.name, phone: loggedUser.phone, password: loggedUser.password })
    }
    async function confirmEdit(e) {
        e.preventDefault();

        try {
            const updateUser = { ...editForm }
            const response = await axios.put(`http://localhost:5000/api/voluntary/update/${loggedUser._id}`, updateUser)
            //Atualizar Context
            const data = await response.data.currentVoluntaryUpdate
            console.log(data);
            setLoggedUser(data);
            setIsEdit(false)
        } catch (error) {
            console.log('Erro ao atualizar', error);
        }

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


                {isEdit
                    ? <>
                        <form onSubmit={(e) => confirmEdit(e)}>
                            <label>Nome</label>
                            <input type="text" name="name" id="name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                            <label>Senha</label>
                            <input type="text" name="password" id="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
                            <label htmlFor="birth_date">Data de nascimento:</label>
                            <input type="date" name="birth_date" id="birth_date" value={editForm.birth_date} onChange={(e) => setEditForm({ ...editForm, birth_date: e.target.value })} />
                            <label htmlFor="email">E-mail</label>
                            <input type="text" name="email" id="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                            <label htmlFor="phone">Telefone</label>
                            <input type="text" name="phone" id="phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />

                            <div>
                                <button onClick={() => openEdit()}>Cancelar</button>
                                <button type='submit'>Confirmar</button>
                            </div>
                        </form>
                    </>
                    : <>
                        <h1>{loggedUser.name}</h1>
                        <p>Data de nascimento: {dataToString(loggedUser.birth_date)}</p>
                        <p>E-mail: {loggedUser.email}</p>
                        <p>Telefone: {loggedUser.phone}</p>
                        <button onClick={() => openEdit()}>Editar perfil</button>
                    </>}


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
                <button onClick={() => DeleteUser()}>Deletar Conta</button>
            </div >
        </>

    )
}

export default User