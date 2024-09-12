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
        color: isActive ? "white" : "white",
      }} // Change background color on hover
      // w={40}
      onClick={onClick} // Ensure this is a function
    >
      <Icon as={icon} w={20} h={8} />
      <Text mt={2}>{label}</Text>
    </Box>
  );
};

export default CategoryButton;