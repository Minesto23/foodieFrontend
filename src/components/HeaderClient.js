import React from "react";
import { Box, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";

/**
 * Componente que muestra el encabezado de un restaurante, incluyendo logo, nombre, horario de apertura y ubicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del restaurante.
 * @param {string} props.logo - URL del logo del restaurante.
 * @param {string} props.opening_hour - Horario de apertura.
 * @param {string} props.location - Dirección del restaurante.
 * @returns {React.Component} RestaurantHeader.
 */
const RestaurantHeader = ({ name, logo, opening_hour, location }) => {
  const bgColor = useColorModeValue("gray.800", "gray.50");

  return (
    <Box
      position="relative"
      bgImage="url('https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgSize="cover"
      bgPosition="center"
      height={{ base: "300px", md: "400px" }} // Altura responsive
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <VStack spacing={4} align="center" textAlign="center">
        {/* Imagen del logo */}
        <Image
          borderRadius="full"
          boxSize={{ base: "100px", md: "150px" }} // Tamaño responsive de la imagen
          src={logo || "logo192.png"} // Usar logo predeterminado si no hay logo proporcionado
          alt="Logo del Restaurante"
          border="4px solid white"
        />

        {/* Nombre y dirección del restaurante */}
        <Box>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            {name}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{location}</Text>
        </Box>

        {/* Horarios de apertura */}
        <Box
          bgColor="green.500"
          color="white"
          px={{ base: 6, md: 8 }}
          py={{ base: 2, md: 4 }}
          borderRadius="full"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "md" }}
        >
          {opening_hour}
        </Box>
      </VStack>
    </Box>
  );
};

export default RestaurantHeader;
