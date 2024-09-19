import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  Text,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Axios from "../api/Axios"; // Axios instance for API calls
import toast from "react-hot-toast"; // Importing toast for notifications
import { useNavigate } from "react-router-dom"; // To navigate after successful registration

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode } = useColorMode(); // Chakra hook to detect light or dark mode
  const isDark = colorMode === "dark";
  const navigate = useNavigate(); // Use navigate for redirecting after registration

  // Registration logic to send data to API
  const handleRegister = async () => {
    try {
      // Send registration data to the API
      // eslint-disable-next-line
      const response = await Axios.post(
        "https://detip.pythonanywhere.com/api/users/",
        {
          email: email,
          password: password,
        }
      );

      // Show success message
      toast.success("Registration successful!");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      // Show error message using toast
      toast.error("Registration failed. Please check your information.");
    }
  };

  return (
    <Box
      width="60%" // Set the form width
      bg={isDark ? "gray.700" : "gray.50"} // Background changes based on theme
      p={8}
      borderRadius="lg" // Rounded corners
    >
      {/* Email Input */}
      <FormControl id="email" mb={4}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          bg={isDark ? "gray.800" : "white"} // Input background based on theme
          color={isDark ? "white" : "black"} // Input text color based on theme
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }} // Placeholder text color
          height="50px" // Increase input height
          fontSize="lg" // Increase font size for better readability
          width="100%" // Input takes full width
        />
      </FormControl>

      {/* Password Input */}
      <FormControl id="password" mb={4}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          bg={isDark ? "gray.800" : "white"} // Input background based on theme
          color={isDark ? "white" : "black"} // Input text color based on theme
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }} // Placeholder text color
          height="50px" // Increase input height
          fontSize="lg" // Increase font size for better readability
          width="100%" // Input takes full width
        />
      </FormControl>

      {/* Register Button */}
      <Button
        width="100%" // Full-width button
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }} // Hover effect for the button
        height="50px" // Increase button height
        fontSize="lg" // Larger button text
        onClick={handleRegister} // Trigger registration on click
        mb={6} // Add bottom margin
      >
        SIGN UP
      </Button>

      {/* Already have an account? */}
      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          Already have an account?
        </Text>
      </Flex>

      {/* Login Button */}
      <Button
        width="100%" // Full-width button
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }} // Hover effect for the button
        height="50px" // Increase button height
        fontSize="lg" // Larger button text
        as={RouterLink} // Use RouterLink to navigate to the login page
        to="/login"
        mb={6} // Add bottom margin
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default RegisterForm;
