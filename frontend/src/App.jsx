import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from './components/header/Navigation'
import Footer from './components/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import ProductDetail from './Pages/ProductDetail'
import Account from './Pages/Account'
import Authentication from './components/Authentication'
import { Box } from '@mui/material'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth" />
  }

  return (
    <Box className="min-h-screen flex flex-col">
      <Navigation />
      
      <Box className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/auth" element={<Authentication />} />
          <Route
            path="/account/*"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>

      <Footer />
    </Box>
  )
}

export default App
