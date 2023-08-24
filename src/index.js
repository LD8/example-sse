import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App id={123} />
    <App id={456} />
    <App id={456} />
    <App id={123} />
  </React.StrictMode>,
)
