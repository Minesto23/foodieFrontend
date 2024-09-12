import React from "react";
import { Text, Box, IconButton, Flex } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

const RestaurantName = ({ name, onEdit }) => {
  return (
    <Box textAlign="center" mt={4}>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          {name}
        </Text>
        {/* Pencil Icon to trigger modal */}
        <IconButton
          aria-label="Edit Restaurant"
          icon={<MdEdit />}
          size="lg"
          variant="ghost"
          ml={2} // Margin to the left of the text
          onClick={onEdit} // This will trigger the modal
        />
      </Flex>

      {/* Orange underline */}
      <Box width="60px" height="3px" bg="orange.400" mt={1} mx="auto" />
    </Box>
  );
};

export default RestaurantName;
