import React from "react";
import { Text, Box, IconButton, Flex } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

/**
 * Componente `RestaurantName`
 *
 * Muestra el nombre del restaurante con la opción de editar si es aplicable.
 *
 * @param {string} name - Nombre del restaurante.
 * @param {function} onEdit - Función que se ejecuta al hacer clic en el botón de edición.
 */
const RestaurantName = ({ name, onEdit }) => {
  return (
    <Box textAlign="center" mt={4}>
      {/* Contenedor del nombre y botón de edición */}
      <Flex justifyContent="center" alignItems="center">
        {/* Nombre del restaurante */}
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          {name}
        </Text>

        {/* Botón de edición, visible solo si hay un restaurante seleccionado */}
        {name !== "Selecciona un restaurante" && (
          <IconButton
            aria-label="Editar Restaurante"
            icon={<MdEdit />}
            size={{ base: "md", md: "lg" }} // Tamaño responsivo del ícono
            variant="ghost"
            ml={2}
            onClick={onEdit}
          />
        )}
      </Flex>

      {/* Línea decorativa naranja debajo del nombre */}
      <Box
        width={{ base: "40px", md: "60px" }} // Ancho responsivo
        height="3px"
        bg="orange.400"
        mt={1}
        mx="auto"
      />
    </Box>
  );
};

export default RestaurantName;
