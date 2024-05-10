import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './routes/GlobalStateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <div className="dark: bg-gray-darker ">
        <App />
      </div>
    </AuthContextProvider>
  </React.StrictMode>,
)
