import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'

// const API_BASE_URL = process.env.VITE_API_URL || "/api";


createRoot(document.getElementById('root')).render(
    <App />
)
