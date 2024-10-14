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
  useColorMode, // Import useColorMode for theme detection
} from "@chakra-ui/react";
import { FaFilePdf, FaQrcode } from "react-icons/fa";
import { useExport } from "../hooks/UserExport"; // Import the custom hook
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate

const ExportModal = ({ isOpen, onClose, restaurantId }) => {
  const { exportQRCode, loading } = useExport(); // Use the custom hook
  const { colorMode } = useColorMode(); // Get current color mode
  const isDark = colorMode === "dark"; // Boolean for dark mode
  const navigate = useNavigate(); // Inicializar useNavigate en el cuerpo del componente

  const handleExportPDF = async () => {
    try {
      // await exportPDF(restaurantId); // Llamada a la función para exportar PDF
      onClose(); // Cerrar modal o realizar cualquier acción posterior
      navigate("/restaurant/" + restaurantId); // Redirigir a la página deseada
    } catch (error) {
      console.error("Error al exportar el PDF:", error); // Manejar el error si ocurre
    }
  };

  const handleExportQRCode = async () => {
    await exportQRCode(restaurantId); // Call the function from the hook
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={isDark ? "gray.800" : "white"} // Adjust background color based on mode
        color={isDark ? "white" : "gray.800"} // Adjust text color based on mode
      >
        <ModalHeader textAlign="center">Export Options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={handleExportPDF}
              isLoading={loading}
              w="full"
            >
              <Flex align="center" p="10px 0">
                <Icon as={FaFilePdf} mr="10px" />
                <Text>Web Menu</Text>
              </Flex>
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleExportQRCode}
              isLoading={loading}
              w="full"
            >
              <Flex align="center" p="10px 0">
                <Icon as={FaQrcode} mr="10px" />
                <Text>QR Code</Text>
              </Flex>
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExportModal;
