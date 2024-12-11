// App.js
import React from "react";
import { ChakraProvider, Box, Text, VStack, Icon } from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";

const Privacy = () => {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgGradient="linear(to-r, teal.500, blue.500)"
        color="white"
      >
        <VStack spacing={4}>
          <Icon as={FaTools} boxSize={16} />
          <Text fontSize="3xl" fontWeight="bold">
            Under Construction
          </Text>
          <Text fontSize="lg">
            We are working hard to bring this page to life!
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Privacy;
