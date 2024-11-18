import React from 'react'
import './styles.css'

const vagas = [{ ID_Vaga: 1, ID_ONG: 1, Título: 'Auxiliar', Descrição: 'Auxila na administração', Requisitos: 'Ensino médio completo', Data_Criação: Date.now() },
{ ID_Vaga: 1, ID_ONG: 1, Título: 'Auxiliar depósito', Descrição: 'Auxila na administração', Requisitos: 'Ensino médio completo', Data_Criação: Date.now() }]

const User = () => {
    const userData = { ID_Voluntário: 1, Nome: 'José', DataNascimento: '11/11/11', Email: 'jose@gmail.com', Telefone: '99999999' }
    return (
        <>
            <div className='userContainer'>
                <div className='userImg'>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-user-icon-download-in-svg-png-gif-file-formats--profile-avatar-account-person-app-interface-pack-icons-1401302.png?f=webp&w=256" alt="" />
                </div>
                <h1>{userData.Nome}</h1>
                <p>Data de nascimento: {userData.DataNascimento}</p>
                <p>E-mail: {userData.Email}</p>
                <p>Telefone: {userData.Telefone}</p>
                <h1>Candidaturas</h1>
                <div className='cardsVagas'>
                    {vagas.map((i) => <div className='cardVaga'>
                        <h2>{i.Título}</h2>
                        <p>ID: {i.ID_Vaga}</p>
                        <p>Data de criação: {i.Data_Criação}</p>
                        <p>ONG: {i.ID_ONG}</p>
                        <p>Descrição: {i.Descrição}</p>
                        <p>Requisitos: {i.Requisitos}</p>

                    </div>)}
                </div>


            </div>
        </>

    )
}

export default User