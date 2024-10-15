import React from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  Text,
  Link,
  Flex,
  useColorMode,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Used to navigate between routes
import { useFormik } from "formik"; // Hook for managing form state
import * as Yup from "yup"; // Used for form validation
import Axios from "../api/Axios"; // Axios instance for making API calls
import { useNavigate } from "react-router-dom"; // Used to programmatically navigate after successful login
import toast from "react-hot-toast"; // For toast notifications


const LoginForm = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const { colorMode } = useColorMode(); // Chakra hook to detect light or dark mode
  const isDark = colorMode === "dark"; // Boolean to check if the current mode is dark

  
  // Initialize formik to manage form data and validation
  const formik = useFormik({
    initialValues: {
      email: "", // Email field initial value
      password: "", // Password field initial value
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address") // Validation for correct email format
        .required("Email is required"), // Email is mandatory
      password: Yup.string().required("Password is required"), // Password is mandatory
    }),
    validateOnChange: false, // Disable validation on every field change
    onSubmit: async (formData, { resetForm }) => {
      // Handle form submission
      try {
        // Make a POST request to the API to get the token
        const { data } = await Axios.post(
          "https://detip.pythonanywhere.com/api/token/",
          formData
        );

        // Save the access and refresh tokens in local storage
        window.localStorage.setItem("access", data.access);
        window.localStorage.setItem("refresh", data.refresh);

        // If login is successful, navigate to the home page
        navigate("/home");

        // Show a success toast message
        toast.success("Login successful!");
      } catch (error) {
        // Handle login errors
        console.error("Login error:", error);

        // Set a general error message for invalid email or password
        formik.setFieldError("general", "Invalid email or password");

        // Show an error toast message
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <Box
      width="60%" // Set the width of the form container
      bg={isDark ? "gray.700" : "gray.50"} // Adjust background color based on theme
      p={8} // Add padding
      borderRadius="lg" // Round the corners of the container
    >
      {/* Display error message if general error exists */}
      {formik.errors.general && (
        <Text color="red.500" mb={4}>
          {formik.errors.general}
        </Text>
      )}

      {/* Email Input */}
      <FormControl
        id="email"
        mb={4} // Margin-bottom
        isInvalid={formik.errors.email && formik.touched.email} // Show error if email is invalid
      >
        <Input
          type="email"
          name="email"
          value={formik.values.email} // Bind value to formik state
          onChange={formik.handleChange} // Handle input changes
          placeholder="Email address" // Placeholder text
          bg={isDark ? "gray.800" : "white"} // Background color based on theme
          color={isDark ? "white" : "black"} // Text color based on theme
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }} // Placeholder text color
          height="50px" // Set height of input field
          fontSize="lg" // Set font size of input
          width="100%" // Set input width to fill parent
        />
        {/* Display email validation errors */}
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      {/* Password Input */}
      <FormControl
        id="password"
        mb={4}
        isInvalid={formik.errors.password && formik.touched.password} // Show error if password is invalid
      >
        <Input
          type="password"
          name="password"
          value={formik.values.password} // Bind value to formik state
          onChange={formik.handleChange} // Handle input changes
          placeholder="Password" // Placeholder text
          bg={isDark ? "gray.800" : "white"} // Background color based on theme
          color={isDark ? "white" : "black"} // Text color based on theme
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }} // Placeholder text color
          height="50px" // Set height of input field
          fontSize="lg" // Set font size of input
          width="100%" // Set input width to fill parent
        />
        {/* Display password validation errors */}
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      {/* Forgot Password Link */}
      <Flex justify="flex-start" mb={4}>
        {/* Link to forgot password page */}
        <Link as={RouterLink} to="/forgot-password" color="orange.400">
          Forgot password?
        </Link>
      </Flex>

      {/* Login Button */}
      <Button
        width="100%" // Full-width button
        bg="orange.400" // Background color for button
        color="white" // Button text color
        _hover={{ bg: "orange.500" }} // Hover state styling
        height="50px" // Button height
        fontSize="lg" // Button text size
        onClick={formik.handleSubmit} // Trigger form submission on click
        mb={6} // Margin-bottom
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
        width="100%" // Full-width button
        bg="orange.400" // Background color for button
        color="white" // Button text color
        _hover={{ bg: "orange.500" }} // Hover state styling
        height="50px" // Button height
        fontSize="lg" // Button text size
        as={RouterLink} // React Router link to signup page
        to="/register"
        mb={6} // Margin-bottom
      >
        SIGN UP
      </Button>
    </Box>
  );
};

export default LoginForm;
