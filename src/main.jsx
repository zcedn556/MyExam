import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavoriteProvider } from './contexts/favorite.context.jsx'

createRoot(document.getElementById('root')).render(
  
    <FavoriteProvider>
      <StrictMode>
          <App />
      </StrictMode>,
    </FavoriteProvider>
  
)
