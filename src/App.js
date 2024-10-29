import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import Dashboard from "./Pages/Home/Dashboard";
import Header from "./components/Header"; // Assuming you created a header component
import Footer from "./components/Footer"; // Import Footer
import Clients from "./Pages/Home/Clients";
import { Toaster } from "react-hot-toast";
import { RestaurantProvider } from "./context/RestaurantContext";

const App = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Manage selected restaurant at this level

  return (
    <ChakraProvider>
      <RestaurantProvider>
        <Router>
          <Toaster position="top-right" reverseOrder={false} />
          <Header onSelectRestaurant={setSelectedRestaurant} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={<Dashboard selectedRestaurant={selectedRestaurant} />}
              />
            <Route path="/" element={<LoginPage />} />{" "}
            {/* Default route to Login */}
            {/* Route for Clients with restaurant ID */}
            <Route path="/restaurant/:id" element={<Clients />} />
          </Routes>
          <Footer /> {/* Correctly placed Footer component */}
        </Router>
      </RestaurantProvider>
    </ChakraProvider>
  );
};

export default App;
