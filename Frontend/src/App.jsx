import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from './Components/NavBar'
function App() {
  return (
<BrowserRouter>
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</BrowserRouter>
  )
}

export default App
