import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

/**
 * Componente HelpModal.
 *
 * Este componente muestra una guía paso a paso para ayudar al usuario a navegar y utilizar la aplicación Foodie.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 *
 * @returns {React.Component} Componente HelpModal.
 */
const HelpModal = ({ isOpen, onClose }) => {
  // Estado para controlar la página actual
  const [page, setPage] = useState(1);

  /**
   * Avanza a la siguiente página de la guía.
   */
  const nextPage = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  /**
   * Retrocede a la página anterior de la guía.
   */
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  /**
   * Renderiza el contenido de la página actual.
   */
  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <Box>
            <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
              ¡Bienvenido a la aplicación Foodie! Esta plataforma ha sido
              diseñada para ayudarte a gestionar tus restaurantes, categorías de
              comida y elementos del menú de forma sencilla y eficiente. Sigue
              esta guía paso a paso para aprender cómo usar todas las
              funcionalidades de la app.
            </Text>
            <Image
              src="/logo192.png"
              alt="Imagen de Bienvenida"
              boxSize={{ base: "200px", md: "400px" }}
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
              <strong>Agregar Restaurantes:</strong> Haz clic en el botón
              "Restaurantes" y selecciona "Agregar restaurante". Completa la
              información básica como el nombre, dirección y teléfono. Esto
              asegurará que el restaurante esté listo para agregar categorías y
              elementos del menú.
            </Text>
            <Image
              src="/page2.png"
              alt="Agregar Restaurante"
              boxSize={{ base: "200px", md: "400px" }}
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
              <strong>Agregar Categorías:</strong> Organiza tus platillos en
              categorías como "Entradas", "Platos principales", o "Postres". Haz
              clic en el botón "Más" dentro de un restaurante para agregar una
              nueva categoría.
            </Text>
            <Image
              src="/page3.png"
              alt="Agregar Categoría"
              boxSize={{ base: "200px", md: "400px" }}
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
              <strong>Agregar Elementos del Menú:</strong> Agrega platillos a
              una categoría existente. Proporciona detalles como el nombre,
              precio, descripción e imagen. Esto asegura que cada platillo esté
              correctamente asociado a su categoría.
            </Text>
            <Image
              src="/page4.png"
              alt="Agregar Elemento del Menú"
              boxSize={{ base: "200px", md: "400px" }}
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 5:
        return (
          <Box>
            <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
              Para consultar esta guía en el futuro, haz clic en el botón
              "Ayuda" en la esquina superior derecha. ¡Esperamos que disfrutes
              usando Foodie App para gestionar tu restaurante de manera
              eficiente!
            </Text>
            <Image
              src="/page5.png"
              alt="Botón de Ayuda"
              boxSize={{ base: "200px", md: "400px" }}
              objectFit="contain"
              mx="auto"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "6xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
          Guía de Uso - Foodie App
        </ModalHeader>
        <ModalBody>{renderContent()}</ModalBody>

        <ModalFooter>
          {/* Botón para página anterior */}
          {page > 1 && (
            <Button
              onClick={prevPage}
              mr={3}
              fontSize={{ base: "sm", md: "md" }}
            >
              Anterior
            </Button>
          )}
          {/* Botón para página siguiente */}
          {page < 5 && (
            <Button
              onClick={nextPage}
              mr={3}
              fontSize={{ base: "sm", md: "md" }}
            >
              Siguiente
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={onClose}
            fontSize={{ base: "sm", md: "md" }}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
