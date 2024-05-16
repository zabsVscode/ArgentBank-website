import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './app/store'
import store from './app/store'
import './index.css'

// Obtenir la référence à l'élément root dans le DOM
const container = document.getElementById('root')

// Créer une racine avec createRoot
const root = createRoot(container)

// Rendre l'application avec la nouvelle API
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
