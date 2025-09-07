import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from './Components/NavBar'
import Register from "./Pages/Register";
import AuthProvider from "./context/Auth/AuthProvider";
import Login from "./Pages/Login";
import { motion, AnimatePresence } from 'framer-motion';
import Cart from "./Pages/Cart";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import CartProvider from "./context/Cart/CartProvider";
// Create a wrapper component for the routes with animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (

    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <AnimatedRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
