import React from "react";
import { Text, Box, IconButton, Flex } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

const RestaurantName = ({ name, onEdit }) => {
  return (
    <Box textAlign="center" mt={4}>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold"> {/* Responsive font size */}
          {name}
        </Text>

        {name !== "Select a restaurant" && (
          <IconButton
            aria-label="Edit Restaurant"
            icon={<MdEdit />}
            size={{ base: "md", md: "lg" }} // Responsive icon size
            variant="ghost"
            ml={2}
            onClick={onEdit}
          />
        )}
      </Flex>

      {/* Responsive orange underline */}
      <Box
        width={{ base: "40px", md: "60px" }} // Responsive width
        height="3px"
        bg="orange.400"
        mt={1}
        mx="auto"
      />
    </Box>
  );
};

export default RestaurantName;
