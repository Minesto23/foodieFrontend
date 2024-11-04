import React from "react";
import {
  Box,
  Text,
  Image // Importa Image para usar en caso de que se agregue la ilustración
} from "@chakra-ui/react";

const EmptyFood = () => {
  return (
    <Box 
      textAlign="center" 
      mt={{ base: 4, md: 8 }} // Margen superior adaptativo
      py={{ base: 6, md: 10 }} // Espaciado vertical adaptativo
    >
      {/* Imagen opcional (puedes descomentar para usarla en el futuro) */}
      {/* <Image
        src="/path-to-illustration.png"
        alt="No Food Items"
        maxW={{ base: "200px", md: "300px" }} // Ancho máximo adaptativo para la imagen
        mx="auto"
        mb={4} // Margen inferior entre la imagen y el texto
      /> */}
      <Text 
        fontSize={{ base: "md", md: "lg" }} // Tamaño de fuente adaptativo
        mt={4} 
        color="gray.500"
      >
        No Food Items Available
      </Text>
    </Box>
  );
};

export default EmptyFood;
