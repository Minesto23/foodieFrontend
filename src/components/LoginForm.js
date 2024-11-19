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

/**
 * Componente LoginForm.
 *
 * Este componente maneja el inicio de sesión de usuarios en la aplicación,
 * validando los datos de entrada y autenticando contra el servidor.
 *
 * @param {Function} onLoginSuccess - Callback que se ejecuta después de un inicio de sesión exitoso.
 *
 * @returns {React.Component} Formulario de inicio de sesión.
 */
const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  /**
   * Formik para manejar los datos del formulario y la validación.
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico no válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    validateOnChange: false, // Validación solo al enviar el formulario
    onSubmit: async (formData, { resetForm }) => {
      try {
        // Realiza la autenticación con la API
        const { data } = await Axios.post(
          "https://detip.pythonanywhere.com/api/token/",
          formData
        );

        // Guarda los tokens en el almacenamiento local
        window.localStorage.setItem("access", data.access);
        window.localStorage.setItem("refresh", data.refresh);

        // Callback de éxito
        if (onLoginSuccess) {
          await onLoginSuccess();
        }

        // Navega al dashboard
        navigate("/home");
        toast.success("Inicio de sesión exitoso");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        formik.setFieldError("general", "Correo o contraseña incorrectos");
        toast.error("No se pudo iniciar sesión. Verifica tus credenciales.");
      }
    },
  });

  return (
    <Box
      width={{ base: "100%", sm: "80%", md: "60%", lg: "40%" }}
      bg={isDark ? "gray.700" : "gray.50"}
      p={{ base: 6, md: 8 }}
      borderRadius="lg"
      mx="auto"
    >
      {/* Mensaje de error general */}
      {formik.errors.general && (
        <Text color="red.500" mb={4}>
          {formik.errors.general}
        </Text>
      )}

      {/* Campo de correo electrónico */}
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
          placeholder="Correo electrónico"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }}
          width="100%"
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      {/* Campo de contraseña */}
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
          placeholder="Contraseña"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }}
          width="100%"
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      {/* Enlace para recuperar contraseña */}
      <Flex justify="flex-start" mb={4}>
        <Link as={RouterLink} to="/forgot-password" color="orange.400">
          ¿Olvidaste tu contraseña?
        </Link>
      </Flex>

      {/* Botón de inicio de sesión */}
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
        INICIAR SESIÓN
      </Button>

      {/* Mensaje para redirigir al registro */}
      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          ¿No tienes una cuenta?
        </Text>
      </Flex>

      {/* Botón de registro */}
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
        REGISTRARSE
      </Button>
    </Box>
  );
};

export default LoginForm;
