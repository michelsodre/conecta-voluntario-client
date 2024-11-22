import './App.css'
//Pages
import Home from './pages/home'
import User from './pages/user'
import Signup from './pages/signup'
import Login from './pages/login'
import Work from './pages/work'
//Components
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Ong from './pages/ong'
import OngWorks from './pages/ongwork'
import WorkDetail from './pages/work-details'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<User />} />
          <Route path='/ong' element={<Ong />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/work' element={<Work />} />
          <Route path='/work/:_id' element={<WorkDetail />} />
          <Route path='/ongwork' element={<OngWorks />} />
        </Routes>
      </div>
    </>
  )
}

export default App
