import React from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Routes, Route, Link } from 'react-router'

import { MainPage } from './pages/MainPage.jsx'
import { UserPage } from './pages/UserPage.jsx'
import { ManagerPage } from './pages/ManagerPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/manager" element={<ManagerPage />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
