import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import Dashboard from "./Pages/Home/Dashboard";
import Header from "./components/Header"; // Assuming you created a header component
import Footer from "./components/Footer"; // Import Footer
import { Toaster } from "react-hot-toast";

const App = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Manage selected restaurant at this level

  return (
    <ChakraProvider>
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
        </Routes>
        <Footer /> {/* Correctly placed Footer component */}
      </Router>
    </ChakraProvider>
  );
};

export default App;
