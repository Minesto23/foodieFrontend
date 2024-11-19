import React from "react";
import { Flex, Box, Image, useColorMode } from "@chakra-ui/react";
import RegisterForm from "../../components/RegisterForm"; // Componente de formulario de registro

/**
 * Página de registro que incluye un logo y un formulario de registro.
 * Diseñada para ser responsiva y adaptarse al tema (claro u oscuro).
 *
 * @returns {JSX.Element} Página de registro.
 */
const RegisterPage = () => {
  const { colorMode } = useColorMode(); // Hook de Chakra para detectar el tema actual
  const isDark = colorMode === "dark"; // Variable para determinar el tema (claro u oscuro)

  return (
    <Flex
      height="100vh" // Altura completa del viewport
      direction={{ base: "column", md: "row" }} // Vertical en móvil, horizontal en pantallas medianas y grandes
    >
      {/* Sección izquierda: Logo */}
      <Box
        flex="1"
        bg={isDark ? "gray.800" : "gray.100"} // Fondo dinámico según el tema
        display={{ base: "none", md: "flex" }} // Oculta el logo en móviles, visible en pantallas medianas y grandes
        alignItems="center" // Centrado vertical
        justifyContent="center" // Centrado horizontal
        p={4} // Espaciado interno
      >
        <Image
          src="/logo192.png" // Ruta al logo de la aplicación
          alt="Logo"
          boxSize={{ base: "120px", sm: "200px", md: "300px", lg: "400px" }} // Tamaño responsivo del logo
          objectFit="contain" // Ajuste del logo para mantener las proporciones
        />
      </Box>

      {/* Sección derecha: Formulario de registro */}
      <Box
        flex="1"
        bg={isDark ? "gray.800" : "gray.100"} // Fondo dinámico según el tema
        display="flex"
        alignItems="center" // Centrado vertical
        justifyContent="center" // Centrado horizontal
        p={{ base: 6, md: 8 }} // Espaciado interno responsivo
        width={{ base: "100%", md: "auto" }} // Ancho completo en móvil
      >
        <RegisterForm /> {/* Componente del formulario de registro */}
      </Box>
    </Flex>
  );
};

export default RegisterPage;
