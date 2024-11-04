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
import Axios from "../api/Axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await Axios.post(
        "https://detip.pythonanywhere.com/api/users/",
        {
          email: email,
          password: password,
        }
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please check your information.");
    }
  };

  return (
    <Box
      width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }} // Responsive width for form container
      bg={isDark ? "gray.700" : "gray.50"}
      p={{ base: 6, md: 8 }} // Responsive padding
      borderRadius="lg"
      mx="auto" // Center form on the page
    >
      {/* Email Input */}
      <FormControl id="email" mb={4}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }} // Responsive font size
          width="100%"
        />
      </FormControl>

      {/* Password Input */}
      <FormControl id="password" mb={4}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }}
          width="100%"
        />
      </FormControl>

      {/* Register Button */}
      <Button
        width="100%"
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px"
        fontSize={{ base: "md", md: "lg" }}
        onClick={handleRegister}
        mb={6}
      >
        SIGN UP
      </Button>

      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          Already have an account?
        </Text>
      </Flex>

      {/* Login Button */}
      <Button
        width="100%"
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px"
        fontSize={{ base: "md", md: "lg" }}
        as={RouterLink}
        to="/login"
        mb={6}
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default RegisterForm;
