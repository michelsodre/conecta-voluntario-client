import './App.css'
//Pages
import Home from './pages/home'
import User from './pages/user'
import Signup from './pages/signup'
import Login from './pages/login'
//Components
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<User />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
