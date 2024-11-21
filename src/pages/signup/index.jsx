import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { GlobalContext } from '../../context';

export default function Signup() {
    //Context
    const context = useContext(GlobalContext)
    const { setLoggedUser, setIsLogged } = context
    //States
    const [formVoluntary, setFormVoluntary] = useState({ name: "", birth_date: "", phone: "", email: "", password: "" })
    const [formOng, setFormOng] = useState({ name: "", phone: "", email: "", description: "", password: "" })
    const navigate = useNavigate()
    ////Cadastro de voluntário
    async function handleSaveVoluntaryToDataBase(e) {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/voluntary/add', {
            name: formVoluntary.name,
            birth_date: formVoluntary.birth_date,
            phone: formVoluntary.phone,
            email: formVoluntary.email,
            password: formVoluntary.password
        }).then(result => {
            console.log(result);
        })
        //Logar conta criada e redirecionar para Home
        try {
            const request = `http://localhost:5000/api/voluntary/onevoluntary?email=${formVoluntary.email}`
            const response = await axios.get(request)
            const data = await response
            const voluntary = data.data.oneVoluntary

            if (voluntary.password == formVoluntary.password) {
                setLoggedUser({ birth_date: voluntary.birth_date, email: voluntary.email, name: voluntary.name, phone: voluntary.phone, _id: voluntary._id, password: voluntary.password })
                setIsLogged(true)
                navigate('/')
            } else {
                console.log('Email ou senha está errado!');
            }
        } catch (error) {
            console.log(error);
        }

    }
    async function handleSaveOngToDataBase(e) {
        e.preventDefault()
        await axios.post('http://localhost:5000/api/ong/add', formOng
        ).then(result => {
            console.log(result);
        })
        navigate('/')
    } console.log(formOng);


    return (
        <div className='formPage'>
            <div className='forms'>
                <form className='form' onSubmit={(e) => handleSaveVoluntaryToDataBase(e)}>
                    <label htmlFor="namev">Nome:</label>
                    <input required type="text" name="namev" id="namev" value={formVoluntary.name} onChange={(e) => setFormVoluntary({ ...formVoluntary, name: e.target.value })} />
                    <label htmlFor="birth_date">Data de nascimento:</label>
                    <input required type="date" name="birth_date" id="birth_date" value={formVoluntary.birth_date} onChange={(e) => setFormVoluntary({ ...formVoluntary, birth_date: e.target.value })} />
                    <label htmlFor="phonev">Telefone:</label>
                    <input required type="text" name="phonev" id="phonev" value={formVoluntary.phone} onChange={(e) => setFormVoluntary({ ...formVoluntary, phone: e.target.value })} />
                    <label htmlFor="emailv">Email:</label>
                    <input required type="text" name="emailv" id="emailv" value={formVoluntary.email} onChange={(e) => setFormVoluntary({ ...formVoluntary, email: e.target.value })} />
                    <label htmlFor="passwordv">Senha:</label>
                    <input required type='password' name="passwordv" id="passwordv" value={formVoluntary.password} onChange={(e) => setFormVoluntary({ ...formVoluntary, password: e.target.value })} />
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
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" value={formOng.password} onChange={(e) => setFormOng({ ...formOng, password: e.target.value })} />
                    <button type="submit">Criar Conta ONG</button>
                </form>
            </div>
        </div>
    )
}
