import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header/Header'
import { url } from './assets/assets'  

const App = () => {
  // const url = "https://food-delivery-backend-eqt3.onrender.com/"
  const location = useLocation();

  // pages where header should be visible
  const showHeader = ["/"].includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        
        {showHeader && <Header />}

        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}


export default App
