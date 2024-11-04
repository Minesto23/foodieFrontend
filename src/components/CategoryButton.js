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
      width={{ base: "80px", md: "100px", lg: "120px" }} // Ancho ajustable según tamaño de pantalla
      height={{ base: "80px", md: "100px", lg: "120px" }} // Alto ajustable según tamaño de pantalla
      onClick={onClick}
    >
      <Icon as={icon} w={{ base: 6, md: 8, lg: 10 }} h={{ base: 6, md: 8, lg: 10 }} /> {/* Tamaño del icono responsive */}
      <Text mt={2} fontSize={{ base: "xs", md: "sm", lg: "md" }}>
        {label}
      </Text>
    </Box>
  );
};

export default CategoryButton;
