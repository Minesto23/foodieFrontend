import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Link,
  Divider,
  useColorMode,
} from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      color={colorMode === "light" ? "gray.800" : "white"}
      py={{ base: 4, md: 6 }} // Padding adaptable
      px={4}
    >
      <Divider mb={4} />
      <Flex
        direction={{ base: "column", md: "row" }} // Vertical en móvil, horizontal en pantallas grandes
        align="center"
        justify={{ base: "center", md: "space-between" }} // Center en móvil, espacio entre elementos en pantallas grandes
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Copyright */}
        <Text
          fontSize={{ base: "sm", md: "md" }} // Fuente adaptable
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
        >
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </Text>

        {/* Footer Links */}
        <Stack
          direction={{ base: "column", sm: "row" }} // Vertical en móvil, horizontal en pantallas grandes
          spacing={{ base: 2, md: 4 }} // Espaciado adaptable
          align="center"
          fontSize={{ base: "sm", md: "md" }} // Fuente adaptable
        >
          <Link href="/privacy" _hover={{ textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          <Link href="/terms" _hover={{ textDecoration: "underline" }}>
            Terms of Service
          </Link>
          <Link href="/contact" _hover={{ textDecoration: "underline" }}>
            Contact Us
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
