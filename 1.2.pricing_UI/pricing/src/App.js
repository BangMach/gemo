import "./App.css"

import { Route, Routes } from "react-router-dom"

import CustomAlert from "./components/CustomAlert/CustomAlert.js"
import { IntlProvider } from "react-intl"
import Login from "./pages/Login/Login"
import MenuPage from "./pages/MenuPage/MenuPage"
import OrderPage from "./pages/OrderPage/OrderPage"
import { Provider } from "react-redux"
import React from "react"
import Register from "./pages/Register/Register"
import store from "./redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CustomAlert />
        <IntlProvider locale="en">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="orders" element={<OrderPage />} />
          </Routes>
        </IntlProvider>
      </div>
    </Provider>
  )
}

export default App
