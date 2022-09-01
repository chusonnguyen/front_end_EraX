import { BrowserRouter as Router } from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//ReactDOM.createRoot(document.getElementById('root')!).render(
//  <React.StrictMode>
//    <Router basename="/">
//      <App />
//    </Router>
//  </React.StrictMode>
//)
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Router basename="/">
      <App />
    </Router>
</React.StrictMode>
)

