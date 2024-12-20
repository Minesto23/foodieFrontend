import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import Dashboard from "./Pages/Home/Dashboard";
import Privacy from "./Pages/Home/Politic";
import Header from "./components/Header"; // Encabezado principal
import Footer from "./components/Footer"; // Pie de página
import Clients from "./Pages/Home/Clients"; // Página de clientes
import { Toaster } from "react-hot-toast"; // Notificaciones globales
import { RestaurantProvider } from "./context/RestaurantContext"; // Contexto global de restaurantes
import { CategoryProvider } from "./context/CategoryContext"; // Contexto global de categorías
import Term from "./Pages/Home/TermService";

/**
 * Componente principal que define la estructura de la aplicación.
 */
const App = () => {
  // Estado para manejar el restaurante seleccionado a nivel global
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <ChakraProvider>
      <RestaurantProvider>
        <CategoryProvider>
          {" "}
          {/* Proveedor de contexto para los datos de categorías */}
          <Router>
            {/* Notificaciones de la aplicación */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* Encabezado principal */}
            <Header onSelectRestaurant={setSelectedRestaurant} />

            {/* Definición de Rutas */}
            <Routes>
              {/* Ruta para iniciar sesión */}
              <Route path="/login" element={<LoginPage />} />

              {/* Ruta para registrar una cuenta */}
              <Route path="/register" element={<RegisterPage />} />

              {/* Ruta para el Dashboard principal */}
              <Route
                path="/home"
                element={
                  <Dashboard
                    selectedRestaurant={selectedRestaurant}
                    setSelectedRestaurant={setSelectedRestaurant}
                  />
                }
              />

              {/* Ruta predeterminada, redirige al inicio de sesión */}
              <Route path="/" element={<LoginPage />} />

              {/* Ruta para la vista de clientes con ID de restaurante */}
              <Route path="/restaurant/:id" element={<Clients />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Term />} />
            </Routes>

            {/* Pie de página */}
            <Footer />
          </Router>
        </CategoryProvider>
      </RestaurantProvider>
    </ChakraProvider>
  );
};

export default App;
