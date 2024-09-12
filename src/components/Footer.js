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
  const { colorMode } = useColorMode(); // Get the current color mode

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      color={colorMode === "light" ? "gray.800" : "white"}
      py={4}
      px={4}
    >
      <Divider mb={4} />
      <Flex
        direction={{ base: "column", md: "row" }} // Stack content vertically on mobile, horizontally on larger screens
        align={{ base: "center", md: "center" }} // Align center on mobile and vertically center on larger screens
        justify={{ base: "center", md: "space-between" }} // Center on mobile, space-between on larger screens
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Copyright */}
        <Text
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
        >
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </Text>

        {/* Footer Links */}
        <Stack
          direction={{ base: "column", sm: "row" }} // Stack vertically on mobile, horizontally on larger screens
          spacing={4}
          align="center"
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
