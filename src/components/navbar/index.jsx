import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  //variavel de troca
  let loggedUser = false
  return (
    <>
      <div className='navbar'>
        <div className='divMenu'>
          <div >
            <Link to={'/'}><img src="https://images.vexels.com/media/users/3/144097/isolated/lists/3dedcd235214cdde6b4e171fdbf66c9d-icone-de-coracao.png" alt="" /></Link>
          </div>
          <ul>
            {
              loggedUser
                ? <>
                  <li>
                    <Link to={'/'}>Logout</Link>
                  </li>
                  <li>
                    <Link to={'/user'}>Meu Perfil</Link>
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
            <li><Link to={'/'}>Início</Link></li>
          </ul>
        </div>
      </div>
    </>

  )
}

export default Navbar