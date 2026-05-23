import React, { useState } from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router'

import { MainPage } from './pages/MainPage.jsx'
import { UserPage } from './pages/UserPage.jsx'
import { ManagerPage } from './pages/ManagerPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { RestorauntsPage } from './pages/RestorauntsPage.jsx'
import { DeliveryPage } from './pages/DeliveryPage.jsx'
import { AgreementPage } from './pages/AgreementPage.jsx'
import { VacanciesPage } from './pages/VacanciesPage.jsx'

import { PrivateRoute } from './components/PrivateRoute.jsx'

// import AuthContext from './contexts/index.js'
// import useAuth from './hooks/index.js'

/* const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('userId')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
} */

/* const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.loggedIn ? children : <Navigate to="/" state={{ from: location }} />
  )
} */

const App = () => {
  return (

    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/addresses" element={<RestorauntsPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/agreement" element={<AgreementPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/" element={<MainPage />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            } 
          />
          <Route path="/manager" element={<ManagerPage />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>

  )
}

export default App
