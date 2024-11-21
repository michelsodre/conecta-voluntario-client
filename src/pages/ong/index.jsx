import axios from "axios"
import { GlobalContext } from "../../context"
import "./styles.css"
import React, { useContext, useEffect, useState } from 'react'

export default function Ong() {
    //Context
    const context = useContext(GlobalContext)
    const { loggedOng, setLoggedOng } = context
    //States
    const [edit, setEdit] = useState(false)
    const [editForm, setEditForm] = useState()
    const [workToDelete, setWorkToDelete] = useState([])
    ////Mostrar Perfil
    ////Editar Perfil
    function isEdit() {
        setEdit(!edit)
        setEditForm(loggedOng)
    }
    async function confirmEdit(e) {
        e.preventDefault()
        try {
            const data = { ...editForm }
            const request = `http://localhost:5000/api/ong/update/${loggedOng._id}`
            const response = await axios.put(request, data)
            const newData = response.data.currentOngUpdate
            setLoggedOng(newData)
            isEdit()
        } catch (error) {
            console.log('Erro ao atualizar', error);
        }
    }
    ////Deletar Perfil
    async function DeleteOng() {
        try {
            await findAdditionsAndDelete()
            await deleteWorks()
        } catch (error) {
            console.log(error);
        }

    }
    async function findWork() {
        try {
            //Encontrar Vagas criadas
            const requestWorks = `http://localhost:5000/api/work/ongworks?id_ong=${loggedOng._id}`
            const response = await fetch(requestWorks)
            const data = await response.json()
            setWorkToDelete(data.works)
        } catch (error) {
            console.log(error);
        }
    }
    //Encontrar inscrições de cada vaga
    async function findAdditionsAndDelete() {
        try {
            const additionsToDelete = await Promise.all(
                workToDelete.map(async (work) => {
                    const requestAdditions = `http://localhost:5000/api/addition/deletemanywork/${work._id}`
                    return axios.delete(requestAdditions)
                }))
        } catch (error) {
            console.log(error);
        }
    }
    //Deletar Vagas da ONG
    async function deleteWorks() {
        try {
            const worksToDelete = await Promise.all(
                workToDelete.map(async (work) => {
                    const requestWork = `http://localhost:5000/api/work/delete/${work._id}`
                    return axios.delete(requestWork)
                })
            )
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        findWork()
    }, [loggedOng._id])

    return (
        <>
            <div>
                {
                    edit
                        ?
                        <>
                            <h1>Editar Informações</h1>
                            <form onSubmit={(e) => confirmEdit(e)} >
                                <label htmlFor="name">Nome</label>
                                <input type="text" name="name" id="name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                                <label htmlFor="description">Descrição</label>
                                <input type="text" name="description" id="description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                                <label htmlFor="phone">Telefone</label>
                                <input type="text" name="phone" id="phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                                <label htmlFor="password">Senha</label>
                                <input type="password" name="password" id="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
                                <button onClick={() => isEdit()}>Cancelar</button>
                                <button type="submit">Confirmar</button>
                            </form>
                            <button onClick={() => DeleteOng()}>Deletar conta</button>
                        </>
                        :
                        <>
                            <h1>{loggedOng.name}</h1>
                            <p>{loggedOng.description}</p>
                            <p>{loggedOng.email}</p>
                            <p>{loggedOng.phone}</p>
                            <button onClick={() => isEdit()}>Editar</button>
                        </>
                }

            </div>
        </>
    )
}
