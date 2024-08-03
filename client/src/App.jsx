import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/products/Categories'
import Brands from './pages/products/Brands'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/auth/login' element={<Login />} />

             {/* Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                       <Route path='/user/:id/dashboard' element={<Dashboard />} />
                       <Route path='/user/:id/products' element={<Products />} />
                       <Route path='/user/:id/products/categories' element={<Categories />} />
                       <Route path='/user/:id/products/brands' element={<Brands />} />
                       <Route path='/user/:id/settings' element={<Settings />} />
             </Route>
     </Routes>
  )
}

export default App
