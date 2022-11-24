import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.scss'
import { AuthContextProvider } from './context/auth'
import { ThemeContextProvider } from './context/theme'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
)
