import React from "react";
import { Text, Box, IconButton, Flex } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
// import { FaQrcode } from "react-icons/fa";

const RestaurantName = ({ name, onEdit }) => {
  return (
    <Box textAlign="center" mt={4}>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          {name}
        </Text>
        {/* Mostrar el botón de edición solo si el nombre no es "Select a restaurant" */}
        {name !== "Select a restaurant" && (
          <IconButton
            aria-label="Edit Restaurant"
            icon={<MdEdit />}
            size="lg"
            variant="ghost"
            ml={2} // Margin to the left of the text
            onClick={onEdit} // Esto activará el modal
          />
        )}
      </Flex>

      {/* Subrayado naranja */}
      <Box width="60px" height="3px" bg="orange.400" mt={1} mx="auto" />
    </Box>
  );
};

export default RestaurantName;
