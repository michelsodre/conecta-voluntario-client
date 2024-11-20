import React, { useEffect, useState } from 'react'
import './styles.css'

function Work() {
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
                        (item, index) =>
                            <div className='workCard' key={item._id}>
                                <div className='workCardItens'>
                                    <h2>{item.title}</h2>
                                    <h3>{ongList[index]?.name}</h3>
                                    <p>Endereço: {item.address}</p>
                                    <p>Descrição: {item.description}</p>
                                    <p>Requisitos: {item.requirements}</p>
                                </div>
                            </div>
                    )
                    : "Sem vagas"
                }
            </div>
        </>
    )
}

export default Work