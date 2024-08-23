import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/public/Home'
import Login from './pages/backend/Login'
import Dashboard from './pages/backend/Dashboard'
import Products from './pages/backend/Products'
import Categories from './pages/backend/products/Categories'
import Brands from './pages/backend/products/Brands'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Settings from './pages/backend/Settings'
import Variations from './pages/backend/products/Variations'

function App() {
  return (
    <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/auth/login' element={<Login />} />

             {/* Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                       <Route path='/user/:id/dashboard' element={<Dashboard />} />
                       <Route path='/user/:id/products' element={<Products />} />
                       <Route path='/user/:id/products/:name' element={<Categories />} />
                       <Route path='/user/:id/products/:name' element={<Brands />} />
                       <Route path='/user/:id/products/:name' element={<Variations />} />
                       <Route path='/user/:id/settings' element={<Settings />} />
             </Route>
     </Routes>
  )
}

export default App
