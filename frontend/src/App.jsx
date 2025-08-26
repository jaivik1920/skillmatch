import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import JobList from "./pages/JobList"
import NotificationListner from "./components/NotificationListner"
import { ToastContainer } from "react-toastify"
import PostJob from "./pages/PostJob"
import MyApplicationsList from "./pages/MyApplicationsList"
import Home from "./pages/Home"
import ApplicantList from "./pages/ApplicantList"
import MyProfile from "./components/MyProfile"

const App = () => {

  return (
    <>
      <NotificationListner/>
      <ToastContainer position="top-right" autoClose = {5000}/>
      <Navbar/>
      <Routes>
      <Route path= "/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<ProtectedRoute><PostJob/></ProtectedRoute>} />
        <Route path="/my-jobs" element={<ProtectedRoute><JobList/></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobList/></ProtectedRoute>} /> 
        <Route path="/my-applications" element={<ProtectedRoute><MyApplicationsList/></ProtectedRoute>} />
        <Route path="/my-jobs/:jobId/showapplicants" element={<ProtectedRoute> <ApplicantList/></ProtectedRoute>}/>
        <Route path="/user/my-profile" element ={<ProtectedRoute> <MyProfile/></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
