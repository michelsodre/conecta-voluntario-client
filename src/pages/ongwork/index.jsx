import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from "../../context"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

export default function OngWorks() {
    const context = useContext(GlobalContext)
    const { loggedOng } = context
    const navigate = useNavigate()
    //States
    const [newWorkForm, setNewWorkForm] = useState({ id_ong: loggedOng._id, title: "", description: "", requirements: "", address: "" })
    const [listOfWorks, setListOfWorks] = useState([])
    const [editWorkId, setEditWorkId] = useState(null); // Rastrea a vaga em edição
    const [editWorkForm, setEditWorkForm] = useState(null); // Dados do formulário de edição
    //Criar nova Vaga
    async function newWork(e) {
        e.preventDefault()
        await axios.post("http://localhost:5000/api/work/add", newWorkForm).then(result => console.log(result))
        fetchListOfWorks()
    }
    //Buscar lista de vagas da ONG
    async function fetchListOfWorks() {
        const request = `http://localhost:5000/api/work/ongworks?id_ong=${loggedOng._id}`
        const response = await fetch(request)
        const data = await response.json()
        setListOfWorks(data.works)

    }
    //Deletar vaga
    async function deleteWork(_id) {
        try {
            await axios.delete(`http://localhost:5000/api/work/delete/${_id}`)
            fetchListOfWorks()
        } catch (error) {
            console.log(error);
        }
    }
    //Editar Vaga
    function startEditing(work) {
        setEditWorkId(work._id); // Define o ID da vaga sendo editada
        setEditWorkForm({ ...work }); // Preenche o formulário com os dados da vaga
    }
    async function saveEdit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/work/update/${editWorkId}`, editWorkForm);
            setEditWorkId(null); // Sai do modo de edição
            setEditWorkForm(null);
            fetchListOfWorks(); // Atualiza a lista
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchListOfWorks()
        if (!loggedOng || !loggedOng._id) {
            navigate('/')
        }
    }, [loggedOng._id])

    return (
        // <div>
        // <div>
        //     <p>Criar vaga</p>
        //     <form onSubmit={(e) => newWork(e)}>
        //         <label htmlFor="title">Título da vaga</label>
        //         <input type="text" name="title" id="title" value={newWorkForm.title} onChange={(e) => setNewWorkForm({ ...newWorkForm, title: e.target.value })} />
        //         <label htmlFor="description">Descrição</label>
        //         <input type="text" name="description" id="description" value={newWorkForm.description} onChange={(e) => setNewWorkForm({ ...newWorkForm, description: e.target.value })} />
        //         <label htmlFor="requirements">Requisitos</label>
        //         <input type="text" name="requirements" id="requirements" value={newWorkForm.requirements} onChange={(e) => setNewWorkForm({ ...newWorkForm, requirements: e.target.value })} />
        //         <label htmlFor="address">Endereço</label>
        //         <input type="text" name="address" id="address" value={newWorkForm.address} onChange={(e) => setNewWorkForm({ ...newWorkForm, address: e.target.value })} />
        //         <button type="submit">Criar Vaga</button>
        //     </form>
        // </div>
        //     <div>
        //         <h1>Minhas Vagas</h1>
        //         {
        //             listOfWorks
        //                 ? listOfWorks.map((work, index) => (
        //                     <div id={index} className='UnitWorkCard'>
        //                         <p>Título: {work.title}</p>
        //                         <p>Descrição: {work.description}</p>
        //                         <p>Requisitos: {work.requirements}</p>
        //                         <p>Endereço: {work.address}</p>
        //                         <button onClick={() => deleteWork(work._id)}>Deletar vaga</button>
        //                     </div>
        //                 ))
        //                 : <p>Sem Vagas</p>
        //         }
        //     </div>
        // </div>

        <div>
            <div>
                <p>Criar vaga</p>
                <form onSubmit={(e) => newWork(e)}>
                    <label htmlFor="title">Título da vaga</label>
                    <input type="text" name="title" id="title" value={newWorkForm.title} onChange={(e) => setNewWorkForm({ ...newWorkForm, title: e.target.value })} />
                    <label htmlFor="description">Descrição</label>
                    <input type="text" name="description" id="description" value={newWorkForm.description} onChange={(e) => setNewWorkForm({ ...newWorkForm, description: e.target.value })} />
                    <label htmlFor="requirements">Requisitos</label>
                    <input type="text" name="requirements" id="requirements" value={newWorkForm.requirements} onChange={(e) => setNewWorkForm({ ...newWorkForm, requirements: e.target.value })} />
                    <label htmlFor="address">Endereço</label>
                    <input type="text" name="address" id="address" value={newWorkForm.address} onChange={(e) => setNewWorkForm({ ...newWorkForm, address: e.target.value })} />
                    <button type="submit">Criar Vaga</button>
                </form>
            </div>
            <h1>Minhas Vagas</h1>
            {
                listOfWorks
                    ? listOfWorks.map((work, index) => (
                        <div key={work._id} className='UnitWorkCard'>
                            {
                                editWorkId === work._id ? (
                                    <form onSubmit={saveEdit}>
                                        <label htmlFor="edit-title">Título:</label>
                                        <input
                                            type="text"
                                            id="edit-title"
                                            value={editWorkForm.title}
                                            onChange={(e) => setEditWorkForm({ ...editWorkForm, title: e.target.value })}
                                        />
                                        <label htmlFor="edit-description">Descrição:</label>
                                        <input
                                            type="text"
                                            id="edit-description"
                                            value={editWorkForm.description}
                                            onChange={(e) => setEditWorkForm({ ...editWorkForm, description: e.target.value })}
                                        />
                                        <label htmlFor="edit-requirements">Requisitos:</label>
                                        <input
                                            type="text"
                                            id="edit-requirements"
                                            value={editWorkForm.requirements}
                                            onChange={(e) => setEditWorkForm({ ...editWorkForm, requirements: e.target.value })}
                                        />
                                        <label htmlFor="edit-address">Endereço:</label>
                                        <input
                                            type="text"
                                            id="edit-address"
                                            value={editWorkForm.address}
                                            onChange={(e) => setEditWorkForm({ ...editWorkForm, address: e.target.value })}
                                        />
                                        <button type="submit">Salvar</button>
                                        <button onClick={() => setEditWorkId(null)}>Cancelar</button>
                                    </form>
                                ) : (
                                    <>
                                        <p>Título: {work.title}</p>
                                        <p>Descrição: {work.description}</p>
                                        <p>Requisitos: {work.requirements}</p>
                                        <p>Endereço: {work.address}</p>
                                        <button onClick={() => startEditing(work)}>Editar</button>
                                        <button onClick={() => deleteWork(work._id)}>Deletar vaga</button>
                                    </>
                                )
                            }
                        </div>
                    ))
                    : <p>Sem Vagas</p>
            }
        </div>
    )
}






