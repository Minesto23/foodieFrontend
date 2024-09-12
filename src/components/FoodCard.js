import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const FoodCard = ({ imageUrl, category, description, price, onClick }) => {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      p={4}
      textAlign="center"
      maxW="200px"
      _hover={{ boxShadow: "lg", transform: "scale(1.05)", transition: "0.3s" }}
      cursor="pointer"
      onClick={onClick} // Ensure this is a function
    >
      {/* Food Image */}
      <Image
        src={imageUrl}
        alt={category}
        borderRadius="md"
        mb={4}
        objectFit="cover"
        height="120px"
        mx="auto"
      />

      {/* Category Name */}
      <Text fontSize="lg" fontWeight="bold" color="gray.700">
        {category}
      </Text>

      {/* Description */}
      <Text fontSize="md" color="gray.500" mb={2}>
        {description}
      </Text>

      {/* Price */}
      <Text fontSize="lg" fontWeight="bold" color="red.500">
        $ {price}
      </Text>
    </Box>
  );
};

export default FoodCard;
