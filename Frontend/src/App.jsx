import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from './Components/NavBar'
import Register from "./Pages/Register";
function App() {
  return (
<BrowserRouter>
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</BrowserRouter>
  )
}

export default App
