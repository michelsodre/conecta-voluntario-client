import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { GlobalContext } from '../../context'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Work() {
    //Context
    const context = useContext(GlobalContext)
    const { loggedUser, isLogged, listCandidaturas, setListCandidaturas } = context
    //States
    const [dataWorkList, setDataWorkList] = useState([])
    const [ongList, setOngsList] = useState([])

    //Functions
    ////Lista de vagas
    async function WorkList() {
        const request = "http://localhost:5000/api/work/"
        const response = await fetch(request)
        const data = await response.json()
        if (data) {
            setDataWorkList(data.workList)
        }
    }
    ////Buscar ONGs e colocar em uma lista para preencher detalhes da vaga
    async function findOng(id_ong) {
        const request = `http://localhost:5000/api/ong/ongid?_id=${id_ong}`
        const response = await fetch(request)
        const data = await response.json()
        const ong = data.oneOng
        setOngsList((listaAtual) => [...listaAtual, ong])
    }
    ////Se Candidatar a vaga
    async function Addition(id_work, id_voluntary) {
        try {
            await axios.post(`http://localhost:5000/api/addition/add?id_work=${id_work}&id_voluntary=${id_voluntary}`)
            await refreshData()
        } catch (error) {
            console.log(error);
        }
    }
    ////Retirar Inscrição
    async function DeleteAddition(additionId) {
        try {
            await axios.delete(`http://localhost:5000/api/addition/delete/${additionId}`)
            await refreshData()
        } catch (error) {
            console.log(error);
        }
    }
    ////Atulizar lista
    async function refreshData() {
        const request = `http://localhost:5000/api/addition/myadditions?id_voluntary=${loggedUser._id}`
        const response = await fetch(request)
        const data = await response.json()
        setListCandidaturas(data.myAdditions)
        WorkList()
    }

    //UseEffects
    useEffect(() => {
        WorkList()
    }, []
    )
    ////Buscar em cada vaga o id da ONG
    useEffect(() => {
        if (dataWorkList.length > 0) {
            dataWorkList.forEach((work) => { findOng(work.id_ong) })
        }
    }, [dataWorkList])

    return (
        <>
            <div>
                <h1>Vagas ofertadas por ONGs</h1>
                {dataWorkList && dataWorkList.length
                    ? dataWorkList.map(
                        (item, index) => {
                            const candidatura = listCandidaturas.find((candidatura) => candidatura.id_work === item._id)

                            return (<div className='workCard' key={item._id}>
                                <div className='workCardItens'>
                                    <h2>{item.title}</h2>
                                    <h3>{ongList[index]?.name || 'Carregando ONG'}</h3>
                                    <p>Endereço: {item.address}</p>
                                    <p>Descrição: {item.description}</p>
                                    <p>Requisitos: {item.requirements}</p>
                                    {isLogged
                                        ? candidatura
                                            ? <button onClick={() => DeleteAddition(candidatura._id)}>Remover Candidatura</button>
                                            : <button onClick={() => Addition(item._id, loggedUser._id)}>Candidatar</button>
                                        : <button><Link to={'/login'} >Candidatar</Link></button>
                                    }

                                </div>
                            </div>)
                        }
                    )
                    : "Sem vagas"
                }
            </div>
        </>
    )
}

export default Work