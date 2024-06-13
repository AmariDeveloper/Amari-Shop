import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import DashboardPage from './pages/dashboard/DashboardPage'

function App() {
  return (
    <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/auth/login' element={<Login />} />

             {/* Protected Routes */}
             <Route path='/dashboard' element={<DashboardPage />} />
    </Routes>
  )
}

export default App
