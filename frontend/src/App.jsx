import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import JobList from "./pages/JobList"
import NotificationListner from "./components/NotificationListner"
import { ToastContainer } from "react-toastify"
import PostJob from "./pages/PostJob"

const App = () => {

  return (
    <>
      <NotificationListner/>
      <ToastContainer position="top-right" autoClose = {5000}/>
      <Navbar/>
      <Routes>
      <Route path= "/" element={ <h1>Hello SkillMatch </h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<ProtectedRoute><PostJob/></ProtectedRoute>} />
        <Route path="/my-jobs" element={<ProtectedRoute><JobList/></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobList/></ProtectedRoute>} /> 
        <Route path="/my-applications" element={<ProtectedRoute><h1>My Applications</h1></ProtectedRoute>} />
        <Route path="/my-profile" element={<ProtectedRoute><h1>My Profile</h1></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
