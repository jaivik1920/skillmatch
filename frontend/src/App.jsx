import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/Register"

const App = () => {

  return (
    <>
      <Routes>
      <Route path= "/" element={ <h1>Hello SkillMatch </h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
