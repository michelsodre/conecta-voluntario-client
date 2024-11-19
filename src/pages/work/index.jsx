import React, { useEffect, useState } from 'react'
import './styles.css'

function Work() {
    const [dataWorkList, setDataWorkList] = useState([])
    async function WorkList() {
        const request = "http://localhost:5000/api/work/"
        const response = await fetch(request)
        const data = await response.json()
        if (data) {
            setDataWorkList(data.workList)
        }
    }
    useEffect(() => {
        WorkList()
    }, []
    )


    console.log(dataWorkList);

    return (
        <>
            <div>
                <h1>Vagas ofertadas por ONGs</h1>
                {
                    dataWorkList.map(
                        item =>
                            <div className='workCard' key={item._id}>
                                <div className='workCardItens'>
                                    <h2>{item.title}</h2>
                                    <p>Endereço: {item.address}</p>
                                    <p>Descrição: {item.description}</p>
                                    <p>Requisitos: {item.requirements}</p>
                                </div>
                            </div>
                    )
                }
            </div>
        </>
    )
}

export default Work