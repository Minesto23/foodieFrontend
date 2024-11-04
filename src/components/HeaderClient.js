import React from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const RestaurantHeader = ({ name, logo, opening_hour, location }) => {
  const bgColor = useColorModeValue("gray.800", "gray.50");

  return (
    <Box
      position="relative"
      bgImage="url('https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgSize="cover"
      bgPosition="center"
      height={{ base: "300px", md: "400px" }} // Responsive height
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <VStack spacing={4} align="center" textAlign="center">
        {/* Logo Image */}
        <Image
          borderRadius="full"
          boxSize={{ base: "100px", md: "150px" }} // Responsive size for image
          src={logo}
          alt="logo"
          border="4px solid white"
        />

        {/* Restaurant Name and Address */}
        <Box>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            {name}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{location}</Text>
        </Box>

        {/* Opening Hours (Styled as Text instead of Button) */}
        <Box
          bgColor="green.500"
          color="white"
          px={{ base: 6, md: 8 }}
          py={{ base: 2, md: 4 }}
          borderRadius="full"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "md" }}
        >
          {opening_hour}
        </Box>
      </VStack>
    </Box>
  );
};

export default RestaurantHeader;
