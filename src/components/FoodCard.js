import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const FoodCard = ({ imageUrl, category, description, price, onClick }) => {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      p={4}
      textAlign="center"
      width="220px" // Ancho fijo del contenedor
      height="300px" // Alto fijo del contenedor
      _hover={{ boxShadow: "lg", transform: "scale(1.05)", transition: "0.3s" }}
      cursor="pointer"
      onClick={onClick} // Asegurarse de que sea una función
    >
      {/* Imagen de la comida */}
      <Image
        src={imageUrl}
        alt={category}
        borderRadius="md"
        mb={4}
        objectFit="cover"
        height="150px" // Tamaño fijo para la imagen
        width="100%" // Ancho fijo para la imagen
        mx="auto"
      />

      {/* Nombre de la categoría */}
      <Text fontSize="lg" fontWeight="bold" color="gray.700" noOfLines={1}>
        {category}
      </Text>

      {/* Descripción */}
      <Text fontSize="sm" color="gray.500" mb={2} noOfLines={2}>
        {description}
      </Text>

      {/* Precio */}
      <Text fontSize="lg" fontWeight="bold" color="red.500">
        $ {price}
      </Text>
    </Box>
  );
};

export default FoodCard;
