import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles.css"
import axios from 'axios'

export default function WorkDetail() {
    const params = useParams()
    const [workDetails, setWorkDetails] = useState(null)
    const [additions, setAdditions] = useState([])
    const [voluntary, setVoluntary] = useState([])
    const [editItem, setEditItem] = useState()
    const [newStatus, setNewStatus] = useState()

    function convertDate(isoDate) {
        const date = new Date(isoDate)
        const convertedDate = date.toLocaleDateString('pt-BR')
        return convertedDate

    }
    useEffect(() => {
        async function getWorkDetails() {
            const request = `http://localhost:5000/api/work/awork?_id=${params._id}`
            const response = await fetch(request)
            const data = await response.json()
            if (data?.aWork) {
                setWorkDetails(data?.aWork)
            }
        }
        getWorkDetails()
    }, [params._id])
    useEffect(() => {
        async function getAdditions() {
            const request = `http://localhost:5000/api/addition/workaddition?id_work=${params._id}`
            const response = await fetch(request)
            const data = await response.json()
            setAdditions(data.myAdditions)
        }
        getAdditions()
    }, [params._id])
    //Buscar voluntários e preencher state
    useEffect(() => {
        if (additions) {
            async function getVoluntary() {
                try {
                    const voluntaryData = await Promise.all(
                        additions.map(async (addition) => {
                            const request = `http://localhost:5000/api/voluntary/onevoluntarybyid?_id=${addition.id_voluntary}`
                            const response = await fetch(request)
                            const data = await response.json()
                            return data.oneVoluntary
                        })
                    )
                    setVoluntary(voluntaryData)
                } catch (error) {
                }
            }
            getVoluntary()
        }
    }
        , [additions])

    //Atualizar Status
    async function updateStatus(id, newStatus) {
        try {
            const request = `http://localhost:5000/api/addition/update/${id}`
            const response = await axios.put(request, { status: newStatus })
            const data = response.data
            if (data.currentAdditionUpdate) {
                setAdditions((prev) =>
                    prev.map((item) =>
                        item._id === id ? { ...item, status: newStatus } : item))
                setEditItem(null)
            } else {
                console.error('Erro ao atualizar status', data.message);
            }
        } catch (error) {
            console.error('Erro ao atualizar status', error);

        }
    }

    return (
        <div className='containerWorkDetails'>{workDetails
            ?
            <>
                <h1>{workDetails.title}</h1>
                <div>
                    <div>
                        <h2>Detalhes</h2>
                        <p>Endereço: {workDetails.address}</p>
                        <p>Descrição: {workDetails.description}</p>
                        <p>Requisitos: {workDetails.requirements}</p>
                    </div>
                    <div><h2>Inscrições</h2></div>
                    {
                        additions.length > 0
                            ?
                            additions.map((item, index) => (
                                <div key={index} className='cardAvaliacao'>
                                    <p>Nome do inscrito: {voluntary[index]?.name || "Carregando..."}</p>
                                    <p>Email: {voluntary[index]?.email || "Carregando..."}</p>
                                    <p>Telefone: {voluntary[index]?.phone || "Carregando..."}</p>
                                    <p>Data da inscrição: {convertDate(item.submit_date)}</p>
                                    <p>Status: {item.status}</p>
                                    {editItem === index
                                        ?
                                        <>
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}>
                                                <option value="">Selecione o status</option>
                                                <option value="Em análise">Em análise</option>
                                                <option value="Aceito">Aceito</option>
                                                <option value="Recusado">Recusado</option>
                                            </select>
                                            <button onClick={() => updateStatus(item._id, newStatus)}>Atualizar</button>
                                        </>
                                        : <button onClick={() => setEditItem(index)}>Avaliar inscrito</button>
                                    }

                                </div>
                            ))

                            : <h1>Não há Inscrições</h1>
                    }
                </div>
            </>
            :
            <>
                <h1>Carregando ...</h1>
            </>
        }

        </div>
    )
}
