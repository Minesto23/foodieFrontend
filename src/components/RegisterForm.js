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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Axios from "../api/Axios";
import toast from "react-hot-toast";

/**
 * Componente RegisterForm
 *
 * Muestra un formulario de registro que permite a los usuarios crear una nueva cuenta.
 *
 * @returns {React.Component} Componente del formulario de registro.
 */
const RegisterForm = () => {
  // Estados locales para gestionar email y contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Manejo del tema de color
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Navegación de React Router
  const navigate = useNavigate();

  /**
   * Maneja el evento de registro al enviar los datos.
   */
  const handleRegister = async () => {
    try {
      // Solicitud para crear un nuevo usuario
      const response = await Axios.post(
        "https://detip.pythonanywhere.com/api/users/",
        {
          email: email,
          password: password,
        }
      );

      toast.success("¡Registro exitoso!"); // Notificación de éxito
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al registrarse:", error);
      toast.error("Error al registrarse. Por favor revisa la información."); // Notificación de error
    }
  };

  return (
    <Box
      width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }} // Ancho adaptable para contenedor del formulario
      bg={isDark ? "gray.700" : "gray.50"}
      p={{ base: 6, md: 8 }} // Padding adaptable
      borderRadius="lg"
      mx="auto" // Centra el formulario en la página
    >
      {/* Campo de entrada para el email */}
      <FormControl id="email" mb={4}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }} // Tamaño de fuente adaptable
          width="100%"
        />
      </FormControl>

      {/* Campo de entrada para la contraseña */}
      <FormControl id="password" mb={4}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          bg={isDark ? "gray.800" : "white"}
          color={isDark ? "white" : "black"}
          _placeholder={{ color: isDark ? "gray.400" : "gray.600" }}
          height="50px"
          fontSize={{ base: "md", md: "lg" }}
          width="100%"
        />
      </FormControl>

      {/* Botón de registro */}
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
        REGISTRARSE
      </Button>

      {/* Texto y enlace para redirigir al inicio de sesión */}
      <Flex justify="flex-start" mb={4}>
        <Text color={isDark ? "gray.400" : "gray.500"}>
          ¿Ya tienes una cuenta?
        </Text>
      </Flex>
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
        INICIAR SESIÓN
      </Button>
    </Box>
  );
};

export default RegisterForm;
