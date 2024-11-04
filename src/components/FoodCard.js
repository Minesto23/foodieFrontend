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
      width={{ base: "160px", md: "200px", lg: "220px" }} // Ancho responsive
      height={{ base: "260px", md: "280px", lg: "300px" }} // Alto responsive
      _hover={{ boxShadow: "lg", transform: "scale(1.05)", transition: "0.3s" }}
      cursor="pointer"
      onClick={onClick}
    >
      {/* Imagen de la comida */}
      <Image
        src={imageUrl}
        alt={category}
        borderRadius="md"
        mb={4}
        objectFit="cover"
        height={{ base: "120px", md: "140px", lg: "150px" }} // Tamaño responsive para la imagen
        width="100%" // Ancho completo para la imagen
        mx="auto"
      />

      {/* Nombre de la categoría */}
      <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="gray.700" noOfLines={1}>
        {category}
      </Text>

      {/* Descripción */}
      <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={2} noOfLines={2}>
        {description}
      </Text>

      {/* Precio */}
      <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="red.500">
        $ {price}
      </Text>
    </Box>
  );
};

export default FoodCard;
