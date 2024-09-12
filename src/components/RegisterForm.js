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

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colorMode } = useColorMode(); // Chakra hook to detect light or dark mode
  const isDark = colorMode === "dark";

  const handleRegister = () => {
    console.log("Registering with:", name, email, password);
    // Add register logic here
  };

  return (
    <Box
      width="60%" // Increase the max width to make the form itself wider
      bg={isDark ? "gray.700" : "gray.50"} // Background changes based on theme
      p={8}
      borderRadius="lg"
    >
      {/* Name Input */}
      <FormControl id="name" mb={4}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          bg={isDark ? "gray.800" : "white"} // Change input background based on theme
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px" // Increase input height
          fontSize="lg" // Increase font size for a larger appearance
          width="100%" // Make the input field take full width
        />
      </FormControl>

      {/* Email Input */}
      <FormControl id="email" mb={4}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          bg={isDark ? "gray.800" : "white"} // Change input background based on theme
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px" // Increase input height
          fontSize="lg" // Increase font size for a larger appearance
          width="100%" // Make the input field take full width
        />
      </FormControl>

      {/* Password Input */}
      <FormControl id="password" mb={4}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          bg={isDark ? "gray.800" : "white"} // Change input background based on theme
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px" // Increase input height
          fontSize="lg" // Increase font size for a larger appearance
          width="100%" // Make the input field take full width
        />
      </FormControl>

      {/* Register Button */}
      <Button
        width="100%" // Make the button take full width
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px" // Increase button height
        fontSize="lg" // Increase font size for larger button text
        onClick={handleRegister}
        mb={6}
      >
        SIGN UP
      </Button>

      {/* Already have an account? */}
      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          Already have an account?
        </Text>
      </Flex>
      <Button
        width="100%" // Make the button take full width
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px" // Increase button height
        fontSize="lg" // Increase font size for larger button text
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
