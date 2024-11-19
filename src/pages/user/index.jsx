import React, { useContext } from 'react'
import './styles.css'
import { GlobalContext } from '../../context'

function User() {
    const context = useContext(GlobalContext)
    const { loggedUser } = context
    return (
        <>
            <div className='userContainer'>
                <div className='userImg'>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-user-icon-download-in-svg-png-gif-file-formats--profile-avatar-account-person-app-interface-pack-icons-1401302.png?f=webp&w=256" alt="" />
                </div>
                <h1>{loggedUser.name}</h1>
                <p>Data de nascimento: {loggedUser.birth_date}</p>
                <p>E-mail: {loggedUser.email}</p>
                <p>Telefone: {loggedUser.phone}</p>
                <h1>Candidaturas</h1>
            </div>
        </>

    )
}

export default User