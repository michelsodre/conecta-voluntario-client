import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ name: "", birth_date: "", phone: "", email: "" })
    const navigate = useNavigate()

    async function handleSaveUserToDataBase(e) {
        e.preventDefault()
        true
            ? await axios.post('http://localhost:5000/api/voluntary/add', {
                name: form.name,
                birth_date: form.birth_date,
                phone: form.phone,
                email: form.email
            })
            : console.log('Editar');
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={(e) => handleSaveUserToDataBase(e)}>
                <label htmlFor="name">Nome:</label>
                <input required type="text" name="name" id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <label htmlFor="birth_date">Data de nascimento:</label>
                <input required type="date" name="birth_date" id="birth_date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
                <label htmlFor="phone">Telefone:</label>
                <input required type="text" name="phone" id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <label htmlFor="email">Email:</label>
                <input required type="text" name="email" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <button type="submit">Criar Conta</button>
            </form>
        </div>
    )
}
