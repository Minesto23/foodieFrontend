import React from "react";
import { Flex, Box, Image, useColorMode } from "@chakra-ui/react";
import LoginForm from "../../components/LoginForm"; // Import the LoginForm component
import { useRestaurantContext } from "../../context/RestaurantContext"; // Import the RestaurantContext

const LoginPage = () => {
  const { colorMode } = useColorMode(); // Chakra hook to detect light or dark mode
  const isDark = colorMode === "dark";
  const { fetchAllRestaurants } = useRestaurantContext(); // Access fetchAllRestaurants from context

  const handleLoginSuccess = async () => {
    // Fetch restaurants after successful login
    await fetchAllRestaurants();
  };

  return (
    <Flex
      height="100vh"
      direction={{ base: "column", md: "row" }} // Stack vertically on mobile, side-by-side on larger screens
    >
      {/* Left Side - Logo Section */}
      <Box
        flex="1"
        bg={isDark ? "gray.800" : "gray.100"} // Dynamic background based on theme
        display={{ base: "none", md: "flex" }} // Hide logo on mobile, show on medium screens and above
        alignItems="center"
        justifyContent="center"
        p={4} // Padding for mobile
      >
        <Image
          src="/logo192.png" // Replace with the actual path to your logo
          alt="Logo"
          boxSize={{ base: "120px", sm: "200px", md: "300px", lg: "400px" }} // Adjust logo size based on screen size
          objectFit="contain"
        />
      </Box>

      {/* Right Side - Login Form Section */}
      <Box
        flex="1"
        bg={isDark ? "gray.800" : "gray.100"} // Dynamic background based on theme
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 6, md: 8 }} // Responsive padding for form area
        width={{ base: "100%", md: "auto" }} // Full width on mobile
      >
        {/* Pass the handleLoginSuccess to the LoginForm */}
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Box>
    </Flex>
  );
};

export default LoginPage;
