import React from "react";
import { Flex, Box, Image, useColorMode } from "@chakra-ui/react";
import LoginForm from "../../components/LoginForm"; // Componente de formulario de inicio de sesión
import { useRestaurantContext } from "../../context/RestaurantContext"; // Contexto para gestionar restaurantes

/**
 * Página de inicio de sesión que incluye un logo y un formulario de login.
 * Gestiona acciones posteriores al inicio de sesión exitoso utilizando el contexto de restaurantes.
 *
 * @returns {JSX.Element} Página de inicio de sesión.
 */
const LoginPage = () => {
  const { colorMode } = useColorMode(); // Detecta el modo (claro u oscuro) usando Chakra UI
  const isDark = colorMode === "dark"; // Variable para determinar el tema actual
  const { fetchAllRestaurants } = useRestaurantContext(); // Acceso a la función para obtener restaurantes

  /**
   * Callback que se ejecuta tras un inicio de sesión exitoso.
   * Realiza la carga de restaurantes disponibles.
   */
  const handleLoginSuccess = async () => {
    try {
      await fetchAllRestaurants(); // Carga los restaurantes desde el contexto
    } catch (error) {
      console.error("Error fetching restaurants after login:", error);
    }
  };

  return (
    <Flex
      height="100vh" // Altura completa del viewport
      direction={{ base: "column", md: "row" }} // Diseño apilado en móviles, horizontal en pantallas grandes
    >
      {/* Sección izquierda: Logo */}
      <Box
        flex="1"
        bg={isDark ? "gray.800" : "gray.100"} // Fondo dinámico basado en el tema
        display={{ base: "none", md: "flex" }} // Oculta en móvil, muestra en pantallas medianas y grandes
        alignItems="center" // Centra el contenido verticalmente
        justifyContent="center" // Centra el contenido horizontalmente
        p={4} // Espaciado interno
      >
        <Image
          src="/logo192.png" // Ruta del logo
          alt="Logo"
          boxSize={{ base: "120px", sm: "200px", md: "300px", lg: "400px" }} // Tamaño responsivo del logo
          objectFit="contain" // Mantiene las proporciones del logo
        />
      </Box>

      {/* Sección derecha: Formulario de inicio de sesión */}
      <Box
        flex="1"
        bg={isDark ? "gray.800" : "gray.100"} // Fondo dinámico basado en el tema
        display="flex"
        alignItems="center" // Centra el contenido verticalmente
        justifyContent="center" // Centra el contenido horizontalmente
        p={{ base: 6, md: 8 }} // Espaciado interno responsivo
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />{" "}
        {/* Formulario de inicio de sesión */}
      </Box>
    </Flex>
  );
};

export default LoginPage;
