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

/**
 * Modal para exportar opciones como menú web en PDF o código QR.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {string} props.restaurantId - ID del restaurante asociado.
 * @returns {React.Component} Componente ExportModal.
 */
const ExportModal = ({ isOpen, onClose, restaurantId }) => {
  const { exportQRCode, loading } = useExport();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();

  /**
   * Maneja la exportación del menú en formato PDF.
   */
  const handleExportPDF = async () => {
    try {
      // Aquí puedes llamar a la función exportPDF si está disponible
      // await exportPDF(restaurantId);
      onClose();
      navigate("/restaurant/" + restaurantId); // Navegar al restaurante correspondiente
    } catch (error) {
      console.error("Error al exportar el PDF:", error);
    }
  };

  /**
   * Maneja la exportación del código QR.
   */
  const handleExportQRCode = async () => {
    try {
      await exportQRCode(restaurantId); // Llamada a la función para exportar el QR
      onClose();
    } catch (error) {
      console.error("Error al exportar el código QR:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "xs", md: "md", lg: "lg" }} // Tamaño adaptativo del modal
    >
      <ModalOverlay />
      <ModalContent
        bg={isDark ? "gray.800" : "white"} // Fondo según el modo de color
        color={isDark ? "white" : "gray.800"} // Texto según el modo de color
        px={{ base: 4, md: 8 }} // Padding horizontal adaptativo
        py={{ base: 4, md: 6 }} // Padding vertical adaptativo
      >
        <ModalHeader textAlign="center" fontSize={{ base: "md", md: "lg" }}>
          Opciones de Exportación
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {/* Botón para exportar menú web en PDF */}
            <Button
              colorScheme="blue"
              onClick={handleExportPDF}
              isLoading={loading}
              w="full"
              fontSize={{ base: "sm", md: "md" }}
              py={{ base: 2, md: 4 }} // Espaciado vertical adaptativo
            >
              <Flex align="center" justify="center">
                <Icon as={FaFilePdf} mr={2} boxSize={{ base: 4, md: 5 }} />
                <Text>Menú Web</Text>
              </Flex>
            </Button>
            {/* Botón para exportar código QR */}
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
                <Text>Código QR</Text>
              </Flex>
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {/* Botón para cerrar el modal */}
          <Button
            colorScheme="red"
            onClick={onClose}
            fontSize={{ base: "sm", md: "md" }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExportModal;
