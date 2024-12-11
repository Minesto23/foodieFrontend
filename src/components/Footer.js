import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Link,
  Divider,
  useColorMode,
} from "@chakra-ui/react";

/**
 * Componente Footer para mostrar enlaces y copyright en la parte inferior de la página.
 *
 * @returns {React.Component} Footer.
 */
const Footer = () => {
  const { colorMode } = useColorMode(); // Detecta el modo de color (claro u oscuro)

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.900"} // Fondo según el modo
      color={colorMode === "light" ? "gray.800" : "white"} // Texto según el modo
      py={{ base: 4, md: 6 }} // Padding vertical adaptable
      px={4} // Padding horizontal fijo
    >
      <Divider mb={4} /> {/* Línea divisoria */}
      <Flex
        direction={{ base: "column", md: "row" }} // Dirección vertical en móvil, horizontal en pantallas grandes
        align="center"
        justify={{ base: "center", md: "space-between" }} // Alineación adaptativa
        maxW="1200px" // Ancho máximo del contenedor
        mx="auto" // Centra horizontalmente
        px={4} // Padding interno
      >
        {/* Sección de Copyright */}
        <Text
          fontSize={{ base: "sm", md: "md" }} // Tamaño de fuente adaptativo
          mb={{ base: 2, md: 0 }} // Margen inferior solo en dispositivos pequeños
          textAlign={{ base: "center", md: "left" }} // Alineación central en móvil, izquierda en pantallas grandes
        >
          © {new Date().getFullYear()} Foodie. Todos los derechos reservados.
        </Text>

        {/* Enlaces del Footer */}
        <Stack
          direction={{ base: "column", sm: "row" }} // Dirección vertical en móvil, horizontal en pantallas más grandes
          spacing={{ base: 2, md: 4 }} // Espaciado adaptativo entre los enlaces
          align="center"
          fontSize={{ base: "sm", md: "md" }} // Tamaño de fuente adaptativo
        >
          <Link href="/privacy" _hover={{ textDecoration: "underline" }}>
            Política de Privacidad
          </Link>
          <Link href="/terms" _hover={{ textDecoration: "underline" }}>
            Términos del Servicio
          </Link>
          <Link
            href="https://www.detipcompany.com/Contact"
            _hover={{ textDecoration: "underline" }}
          >
            Contáctanos
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
