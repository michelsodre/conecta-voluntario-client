import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Signup() {
    const [formVoluntary, setFormVoluntary] = useState({ name: "", birth_date: "", phone: "", email: "" })
    const [formOng, setFormOng] = useState({ name: "", phone: "", email: "", description: "" })
    const navigate = useNavigate()

    async function handleSaveVoluntaryToDataBase(e) {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/voluntary/add', {
            name: formVoluntary.name,
            birth_date: formVoluntary.birth_date,
            phone: formVoluntary.phone,
            email: formVoluntary.email
        }).then(result => {
            console.log(result);
        })
        navigate('/')
    }
    async function handleSaveOngToDataBase(e) {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/ong/add', {
            name: formOng.name,
            phone: formOng.phone,
            email: formOng.email,
            description: formOng.description
        }).then(result => {
            console.log(result);
        })
        navigate('/')
    }

    return (
        <div className='formPage'>
            <div className='forms'>
                <form className='form' onSubmit={(e) => handleSaveVoluntaryToDataBase(e)}>
                    <label htmlFor="name">Nome:</label>
                    <input required type="text" name="name" id="name" value={formVoluntary.name} onChange={(e) => setFormVoluntary({ ...formVoluntary, name: e.target.value })} />
                    <label htmlFor="birth_date">Data de nascimento:</label>
                    <input required type="date" name="birth_date" id="birth_date" value={formVoluntary.birth_date} onChange={(e) => setFormVoluntary({ ...formVoluntary, birth_date: e.target.value })} />
                    <label htmlFor="phone">Telefone:</label>
                    <input required type="text" name="phone" id="phone" value={formVoluntary.phone} onChange={(e) => setFormVoluntary({ ...formVoluntary, phone: e.target.value })} />
                    <label htmlFor="email">Email:</label>
                    <input required type="text" name="email" id="email" value={formVoluntary.email} onChange={(e) => setFormVoluntary({ ...formVoluntary, email: e.target.value })} />
                    <button type="submit">Criar Conta Voluntário</button>
                </form>
                <form className='form' onSubmit={(e) => handleSaveOngToDataBase(e)}>
                    <label htmlFor="name">Nome:</label>
                    <input required type="text" name="name" id="name" value={formOng.name} onChange={(e) => setFormOng({ ...formOng, name: e.target.value })} />
                    <label htmlFor="description">Descrição:</label>
                    <textarea required name="description" id="description" value={formOng.description} onChange={(e) => setFormOng({ ...formOng, description: e.target.value })}></textarea>
                    <label htmlFor="phone">Telefone:</label>
                    <input required type="text" name="phone" id="phone" value={formOng.phone} onChange={(e) => setFormOng({ ...formOng, phone: e.target.value })} />
                    <label htmlFor="email">Email:</label>
                    <input required type="text" name="email" id="email" value={formOng.email} onChange={(e) => setFormOng({ ...formOng, email: e.target.value })} />
                    <button type="submit">Criar Conta ONG</button>
                </form>
            </div>
        </div>
    )
}
