import React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";

/**
 * Botón para seleccionar categorías con diseño responsive y estado activo.
 *
 * @param {Object} props
 * @param {React.ElementType} props.icon - Icono a mostrar en el botón.
 * @param {string} props.label - Etiqueta descriptiva del botón.
 * @param {boolean} props.isActive - Indica si el botón está activo.
 * @param {function} props.onClick - Función a ejecutar al hacer clic en el botón.
 * @returns {React.Component} Componente de botón de categoría.
 */
const CategoryButton = ({ icon, label, isActive, onClick }) => {
  return (
    <Box
      bg={isActive ? "red.500" : "white"} // Fondo cambia según el estado activo
      color={isActive ? "white" : "black"} // Color de texto cambia según el estado activo
      boxShadow="md"
      borderRadius="md"
      p={4}
      textAlign="center"
      cursor="pointer"
      transition="all 0.3s ease" // Suaviza las transiciones
      _hover={{
        bg: "red.600",
        color: "white",
      }}
      width={{ base: "80px", md: "100px", lg: "120px" }} // Ancho responsive
      height={{ base: "80px", md: "100px", lg: "120px" }} // Alto responsive
      onClick={onClick}
    >
      {/* Icono del botón */}
      <Icon
        as={icon}
        w={{ base: 6, md: 8, lg: 10 }} // Tamaño del icono responsive
        h={{ base: 6, md: 8, lg: 10 }}
      />

      {/* Etiqueta del botón */}
      <Text
        mt={2}
        fontSize={{ base: "xs", md: "sm", lg: "md" }} // Tamaño del texto responsive
        whiteSpace="nowrap" // Evita el quiebre del texto
        overflow="hidden" // Oculta texto desbordante
        textOverflow="ellipsis" // Añade "..." al texto truncado
        maxWidth="100%" // Asegura que el texto no desborde el contenedor
      >
        {label}
      </Text>
    </Box>
  );
};

export default CategoryButton;
