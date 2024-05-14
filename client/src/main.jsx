import React from 'react'
import ReactDOM from 'react-dom/client'
import './firebase/firebase.js'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>

    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
