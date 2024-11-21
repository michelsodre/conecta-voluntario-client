import axios from "axios"
import { GlobalContext } from "../../context"
import "./styles.css"
import React, { useContext, useState } from 'react'

export default function Ong() {
    //Context
    const context = useContext(GlobalContext)
    const { loggedOng, setLoggedOng } = context
    const [edit, setEdit] = useState(false)
    const [editForm, setEditForm] = useState()
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
            console.log(newData);
            setLoggedOng(newData)
            isEdit()
        } catch (error) {
            console.log('Erro ao atualizar', error);
        }
    }
    ////Deletar Perfil
    console.log(editForm);

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
                                <input type="text" name="descrition" id="description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                                <label htmlFor="phone">Telefone</label>
                                <input type="text" name="phone" id="phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                                <label htmlFor="password">Senha</label>
                                <input type="password" name="password" id="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
                                <button onClick={() => isEdit()}>Cancelar</button>
                                <button type="submit">Confirmar</button>
                            </form>
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
