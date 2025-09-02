import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/NavBar";
import RegisterPage from "./Pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./Pages/LoginPage.tsx";
import CartPage from "./Pages/CartPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderSuccessPage from "./Pages/OrderSuccessPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;