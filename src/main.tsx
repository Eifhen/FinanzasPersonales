import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import RouterManager from './router/router.manager'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterManager />
  </React.StrictMode>
)
