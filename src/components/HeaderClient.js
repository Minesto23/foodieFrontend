import React from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const RestaurantHeader = ({ name, logo, opening_hour, location }) => {
  const bgColor = useColorModeValue("gray.800", "gray.50"); // Adjust colors based on the mode

  return (
    <Box
      position="relative"
      bgImage="url('https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" // Replace with the correct image path
      bgSize="cover"
      bgPosition="center"
      height="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <VStack spacing={4} align="center" textAlign="center">
        {/* Burger Image */}
        <Image
          borderRadius="full"
          boxSize="150px"
          src={logo} // Replace with the burger image URL
          alt="logo"
          border="4px solid white"
        />

        {/* Restaurant Name and Address */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="md">{location}</Text>
        </Box>

        {/* Opening Hours */}
        <Button
          colorScheme="green"
          size="lg"
          borderRadius="full"
          px={8}
          py={4}
          fontWeight="bold"
        >
          {opening_hour}
        </Button>
      </VStack>
    </Box>
  );
};

export default RestaurantHeader;
