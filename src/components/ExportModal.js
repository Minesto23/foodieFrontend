import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Flex,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaFilePdf, FaQrcode } from "react-icons/fa";
import { useExport } from "../hooks/UserExport";
import { useNavigate } from "react-router-dom";

const ExportModal = ({ isOpen, onClose, restaurantId }) => {
  const { exportQRCode, loading } = useExport();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();

  const handleExportPDF = async () => {
    try {
      // await exportPDF(restaurantId);
      onClose();
      navigate("/restaurant/" + restaurantId);
    } catch (error) {
      console.error("Error al exportar el PDF:", error);
    }
  };

  const handleExportQRCode = async () => {
    await exportQRCode(restaurantId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: "xs", md: "md", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent
        bg={isDark ? "gray.800" : "white"}
        color={isDark ? "white" : "gray.800"}
        px={{ base: 4, md: 8 }} // Padding horizontal adaptativo
        py={{ base: 4, md: 6 }} // Padding vertical adaptativo
      >
        <ModalHeader textAlign="center" fontSize={{ base: "md", md: "lg" }}>
          Export Options
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={handleExportPDF}
              isLoading={loading}
              w="full"
              fontSize={{ base: "sm", md: "md" }}
              py={{ base: 2, md: 4 }} // Espaciado vertical del botón adaptativo
            >
              <Flex align="center" justify="center">
                <Icon as={FaFilePdf} mr={2} boxSize={{ base: 4, md: 5 }} />
                <Text>Web Menu</Text>
              </Flex>
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleExportQRCode}
              isLoading={loading}
              w="full"
              fontSize={{ base: "sm", md: "md" }}
              py={{ base: 2, md: 4 }}
            >
              <Flex align="center" justify="center">
                <Icon as={FaQrcode} mr={2} boxSize={{ base: 4, md: 5 }} />
                <Text>QR Code</Text>
              </Flex>
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose} fontSize={{ base: "sm", md: "md" }}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExportModal;
