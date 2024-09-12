import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

const EmptyFood = () => {
  return (
    <Box textAlign="center" mt={8} py={10}>
      {/* <Image
        src="/path-to-illustration.png"
        alt="No Food Items"
        maxW="300px"
        mx="auto"
      /> */}
      <Text fontSize="lg" mt={4} color="gray.500">
        No Food Items Available
      </Text>
    </Box>
  );
};

export default EmptyFood;
