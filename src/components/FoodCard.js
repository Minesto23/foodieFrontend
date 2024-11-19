import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

/**
 * Componente de tarjeta para mostrar detalles de un elemento de comida.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.imageUrl - URL de la imagen del elemento de comida.
 * @param {string} props.category - Nombre de la categoría de la comida.
 * @param {string} props.description - Descripción del elemento de comida.
 * @param {number} props.price - Precio del elemento de comida.
 * @param {function} props.onClick - Función a ejecutar al hacer clic en la tarjeta.
 * @returns {React.Component} Componente FoodCard.
 */
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
      _hover={{
        boxShadow: "lg",
        transform: "scale(1.05)",
        transition: "0.3s ease", // Suaviza la transición
      }}
      cursor="pointer"
      onClick={onClick}
    >
      {/* Imagen del elemento */}
      <Image
        src={imageUrl}
        alt={`Imagen de ${category}`} // Texto alternativo para accesibilidad
        borderRadius="md"
        mb={4} // Margen inferior para separar de los textos
        objectFit="cover"
        height={{ base: "120px", md: "140px", lg: "150px" }} // Tamaño responsive de la imagen
        width="100%" // Imagen ocupa todo el ancho del contenedor
        mx="auto"
      />

      {/* Nombre de la categoría */}
      <Text
        fontSize={{ base: "md", md: "lg" }} // Tamaño de fuente adaptativo
        fontWeight="bold"
        color="gray.700"
        noOfLines={1} // Limita el texto a una línea con "..."
      >
        {category}
      </Text>

      {/* Descripción del elemento */}
      <Text
        fontSize={{ base: "xs", md: "sm" }} // Tamaño de fuente adaptativo
        color="gray.500"
        mb={2} // Margen inferior
        noOfLines={2} // Limita la descripción a dos líneas
      >
        {description}
      </Text>

      {/* Precio del elemento */}
      <Text
        fontSize={{ base: "md", md: "lg" }} // Tamaño de fuente adaptativo
        fontWeight="bold"
        color="red.500"
      >
        $ {price}
      </Text>
    </Box>
  );
};

export default FoodCard;
