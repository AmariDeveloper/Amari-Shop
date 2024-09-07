import { Route, Routes, useLocation } from 'react-router-dom'
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
import SingleProduct from './pages/public/SingleProduct'
import Cart from './pages/public/Cart'
import { useEffect } from 'react'
import Checkout from './pages/public/Checkout'
import BillingConfirmation from './pages/public/BillingConfirmation'

function App() {
  const location = useLocation();

  useEffect(() => {
          window.scrollTo(0, 0);
  }, [location])
  return (
    <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/auth/login' element={<Login />} />
             <Route path="/product/:name" element={<SingleProduct />} />
             <Route path='/cart' element={<Cart />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path='/checkout/billing-confirmation' element={<BillingConfirmation />} />

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
