import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * Componente que muestra un mensaje cuando no hay elementos de comida disponibles.
 *
 * @returns {React.Component} Componente EmptyFood.
 */
const EmptyFood = () => {
  return (
    <Box
      textAlign="center"
      mt={{ base: 4, md: 8 }} // Margen superior adaptativo
      py={{ base: 6, md: 10 }} // Espaciado vertical adaptativo
    >
      <Text
        fontSize={{ base: "md", md: "lg" }} // Tamaño de fuente adaptativo
        mt={4}
        color="gray.500"
      >
        No hay elementos de comida disponibles
      </Text>
    </Box>
  );
};

export default EmptyFood;
