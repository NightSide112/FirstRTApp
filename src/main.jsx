import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Cart from './components/Cart.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
