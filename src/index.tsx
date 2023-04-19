import ReactDOM from 'react-dom/client'
import App from '@src/app/App'
import { StreamProvider } from '@src/app/ChatStream/StreamContext'
import React from 'react'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <StreamProvider>
      <App />
    </StreamProvider>
  </React.StrictMode>
)
