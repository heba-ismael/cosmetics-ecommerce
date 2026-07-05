
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './components/Context/CartContext.jsx'
import AuthProvider from './components/Context/AuthContext.jsx'
import ThemeProvider from './components/Context/ThemeContext.jsx'


 ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
     <ThemeProvider>
       <AuthProvider>
         <CartProvider>
           <App/>
         </CartProvider>
       </AuthProvider>
     </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
