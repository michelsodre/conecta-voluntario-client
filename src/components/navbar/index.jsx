import React, { useContext } from 'react'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/index'

const Navbar = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()
  const { isLogged, setIsLogged, loggedUser, setLoggedUser } = context
  function logout() {
    setIsLogged(false)
    setLoggedUser({ name: "", _id: "" })
    navigate('/')
  }

  //variavel de troca
  return (
    <>
      <div className='navbar'>
        <div className='divMenu'>
          <div >
            <Link to={'/'}><img src="https://images.vexels.com/media/users/3/144097/isolated/lists/3dedcd235214cdde6b4e171fdbf66c9d-icone-de-coracao.png" alt="" /></Link>
          </div>
          <ul>
            {
              isLogged //condicional para usuário logado
                ? <>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                  <li>
                    <Link to={'/user'}>Perfil de {loggedUser.name}</Link>
                  </li>
                </>
                : <>
                  <li>
                    <Link to={'/signup'}>
                      Cadastrar
                    </Link>
                  </li>
                  <li>
                    <Link to={'/login'}>Login</Link>
                  </li></>}
            <li><Link to={'/work'}>Vagas</Link></li>
            <li><Link to={'/'}>Início</Link></li>
          </ul>
        </div>
      </div>
    </>

  )
}

export default Navbar