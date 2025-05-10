import React from 'react'
import Navbar from '../AdminNavBar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import AddFoodItem from '../AddFoodItem/AddFoodItem'
import { Route, Routes } from 'react-router-dom'
import ListOrder from '../ListOrder/ListOrder'
import ListProduct from '../ListAllProduct/ListProduct'
import ListUsers from '../ListAllUsers/ListUsers'
import AdminProfile from '../AdminProfile/AdminProfile'
import EditFoodItem from '../EditFoodItem/EditFoodItem'
import EditOrder from '../EditOrder/EditOrder'
const AdminRoutes = () => {
  return (
    <div>
      <Navbar/>
      <section className='admin-dashboard'>
        <aside className='admin-sidebar'>
        <Sidebar/>
        </aside>
        <div className="admin-dashboard-content">
        <Routes>
        <Route path="/add-product" element={<AddFoodItem/>} />
        <Route path="/list-product" element={<ListProduct/>} />
        <Route path="/edit/:id" element={<EditFoodItem/>} />
        <Route path="/edit-order/:id" element={<EditOrder/>} />
        <Route path="/list-order" element={<ListOrder/>} />
        <Route path="/list-users" element={<ListUsers/>} />
        <Route path="/profile" element={<AdminProfile/>} />
      </Routes>
      {/* <AddFoodItem /> */}
        </div>
      </section>
      

      
    </div>
  )
}

export default AdminRoutes
