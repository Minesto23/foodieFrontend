import React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";

const CategoryButton = ({ icon, label, isActive, onClick }) => {
  return (
    <Box
      bg={isActive ? "red.500" : "white"}
      color={isActive ? "white" : "black"}
      boxShadow="md"
      borderRadius="md"
      p={4}
      textAlign="center"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        bg: isActive ? "red.600" : "red.600",
        color: "white",
      }}
      width="120px" // Ancho fijo
      height="120px" // Alto fijo
      onClick={onClick}
    >
      <Icon as={icon} w={10} h={10} /> {/* Tamaño fijo para el icono */}
      <Text mt={2} fontSize="sm">
        {" "}
        {/* Tamaño de texto ajustado */}
        {label}
      </Text>
    </Box>
  );
};

export default CategoryButton;
