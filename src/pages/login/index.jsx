import React, { useContext, useState } from 'react'
import "./styles.css"
import { GlobalContext } from '../../context/index'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [formOng, setFormOng] = useState({ email: "", password: "" })
    const context = useContext(GlobalContext)
    const navigate = useNavigate()
    const { setIsLogged, setLoggedUser, loggedOng, setLoggedOng, setIsOng } = context

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const request = `http://localhost:5000/api/voluntary/onevoluntary?email=${form.email}`
            const response = await axios.get(request)
            const data = await response
            const voluntary = data.data.oneVoluntary

            if (voluntary.password == form.password) {
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

    async function onSubmitOng(e) {
        e.preventDefault()
        try {
            const request = `http://localhost:5000/api/ong/oneong?email=${formOng.email}`
            const response = await axios.get(request)
            const data = await response
            const ong = data.data.oneOng

            if (ong.password == formOng.password) {
                await setLoggedOng(ong)
                setIsOng(true)
                setIsLogged(true)
                navigate('/')
            } else {
                console.log('Email ou senha está errado!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='logincontainer'>
            
            <h4>CONECTA VOLUNTÁRIO</h4> 
            <h3>Faça o login na sua conta</h3>  
            <div className='title'>  
            <p>Não tem cadastro?</p>
            <button><Link to={'/signup'}>Cadastre-se</Link></button>
            </div>
            <form className='loginForm' onSubmit={(e) => onSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <label htmlFor="password">Senha</label>
                <input type="text" name="password" id="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Login Voluntário</button>
            </form>
            <form className='loginForm' onSubmit={(e) => onSubmitOng(e)}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={formOng.email} onChange={(e) => setFormOng({ ...formOng, email: e.target.value })} />
                <label htmlFor="password">Senha</label>
                <input type="text" name="password" id="password" value={formOng.password} onChange={(e) => setFormOng({ ...formOng, password: e.target.value })} />
                <button type="submit">Login ONG</button>
            </form>
        </div>
    )
}
