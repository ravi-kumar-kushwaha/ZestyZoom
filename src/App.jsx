import './App.css'
import { CartContextProvider } from './Components/Store/CartContext'
import { ProgressContextProvider } from './Components/Store/ProgressContext'
import UserRoutes from './Components/UserRoutes/UserRoutes'
// import CartContext from './Components/Store/CartContext'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import AdminRoutes from './Components/AdminDashBoard/AdminRoutes/AdminRoutes'
import ContactUsRoutes from './Components/ContactRoutes/ContactUsRoutes'
import EmergencyContact from './Components/ReportAndEmergencyRoutes/EmergencyContact'
import AboutUs from './Components/AboutUsRoutes/AboutUs'

function App() {
  return (
    <ProgressContextProvider>
    <CartContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path='/contact/*' element={<ContactUsRoutes/>} />
        <Route path='/emergency/*' element={<EmergencyContact/>}/>
        <Route path='/about/*' element={<AboutUs/>}/>
      </Routes>
      </BrowserRouter>
    </CartContextProvider>
   </ProgressContextProvider>
  )
}

export default App
