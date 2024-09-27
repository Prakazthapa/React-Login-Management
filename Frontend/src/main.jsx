import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './css/global.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
  <ToastContainer
        position="top-right"
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Place the toast next to the newest on top
        closeOnClick 
        rtl={false} // Change the direction of the toast
        pauseOnFocusLoss // Pause on focus loss
        draggable
        pauseOnHover
        />
    <App />
  </BrowserRouter>
  // </StrictMode> 
)
