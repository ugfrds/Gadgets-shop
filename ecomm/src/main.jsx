import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { VariationProvider } from './context/VariationContext'; 


createRoot(document.getElementById('root')).render(
  <VariationProvider>
  <BrowserRouter basename="/Gadgets-shop">
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </VariationProvider>,
)

