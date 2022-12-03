import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import Details from './pages/Details'
import Create from './pages/Create'
// import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blog/:id' element={<Details />} />
        <Route path='/user/:id' element={<Profile />} />
        <Route path='/admin' element={<Profile />} />
        <Route path='/create' element={<Create />} />
        <Route path='/create/:id' element={<Create />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  )
}

export default App
