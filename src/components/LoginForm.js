import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  Text,
  Link,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colorMode } = useColorMode(); // Chakra hook to detect light or dark mode
  const isDark = colorMode === "dark";

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // Add login logic here
  };

  return (
    <Box
      width="60%" // Increase the max width to make the form itself wider
      bg={isDark ? "gray.700" : "gray.50"} // Background changes based on theme
      p={8}
      borderRadius="lg"
    >
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

      {/* Forgot Password Link */}
      <Flex justify="flex-start" mb={4}>
        <Link color="orange.400" href="/forgot-password">
          Forgot password?
        </Link>
      </Flex>

      {/* Login Button */}
      <Button
        width="100%" // Make the button take full width
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px" // Increase button height
        fontSize="lg" // Increase font size for larger button text
        onClick={handleLogin}
        mb={6}
      >
        SIGN IN
      </Button>

      {/* Don't have an account text */}
      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          Don't have an account?
        </Text>
      </Flex>

      {/* Sign Up Button */}
      <Button
        width="100%" // Make the button take full width
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px" // Increase button height
        fontSize="lg" // Increase font size for larger button text
        as={RouterLink}
        to="/register"
        mb={6}
      >
        SIGN UP
      </Button>
    </Box>
  );
};

export default LoginForm;
