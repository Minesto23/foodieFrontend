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
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../api/Axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const { data } = await Axios.post(
          "https://detip.pythonanywhere.com/api/token/",
          formData
        );

        window.localStorage.setItem("access", data.access);
        window.localStorage.setItem("refresh", data.refresh);

        if (onLoginSuccess) {
          await onLoginSuccess();
        }

        navigate("/home");
        toast.success("Login successful!");
      } catch (error) {
        console.error("Login error:", error);
        formik.setFieldError("general", "Invalid email or password");
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <Box
      width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }} // Responsive width for form container
      bg={isDark ? "gray.700" : "gray.50"}
      p={{ base: 6, md: 8 }} // Responsive padding
      borderRadius="lg"
      mx="auto" // Center form on the page
    >
      {formik.errors.general && (
        <Text color="red.500" mb={4}>
          {formik.errors.general}
        </Text>
      )}

      {/* Email Input */}
      <FormControl
        id="email"
        mb={4}
        isInvalid={formik.errors.email && formik.touched.email}
      >
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email address"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }} // Responsive font size
          width="100%"
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      {/* Password Input */}
      <FormControl
        id="password"
        mb={4}
        isInvalid={formik.errors.password && formik.touched.password}
      >
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }}
          width="100%"
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <Flex justify="flex-start" mb={4}>
        <Link as={RouterLink} to="/forgot-password" color="orange.400">
          Forgot password?
        </Link>
      </Flex>

      {/* Login Button */}
      <Button
        width="100%"
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px"
        fontSize={{ base: "md", md: "lg" }}
        onClick={formik.handleSubmit}
        mb={6}
      >
        SIGN IN
      </Button>

      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          Don't have an account?
        </Text>
      </Flex>

      {/* Sign Up Button */}
      <Button
        width="100%"
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        height="50px"
        fontSize={{ base: "md", md: "lg" }}
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
