import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CarrinhoProvider } from './context/CarrinhoContext.tsx'
import './style/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </BrowserRouter>
)
