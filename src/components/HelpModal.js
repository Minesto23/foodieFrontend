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

const HelpModal = ({ isOpen, onClose }) => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <Box>
            <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
              ¡Bienvenido a la aplicación Foodie! Esta plataforma ha sido
              diseñada para ayudarte a gestionar tus restaurantes, categorías de
              comida y elementos del menú de forma sencilla y eficiente. Aquí
              podrás controlar todos los aspectos relacionados con la operación
              de un restaurante, desde agregar un nuevo establecimiento hasta
              gestionar cada platillo del menú. Sigue esta guía paso a paso para
              aprender cómo usar todas las funcionalidades de la app.
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
              <strong>Agregar restaurantes:</strong> Para comenzar, lo primero
              que debes hacer es agregar tu restaurante. Dirígete a la parte
              superior de la página y haz clic en el botón "Restaurantes".
              Desde allí, selecciona "Agregar restaurante". A continuación, se
              abrirá un formulario en el que deberás completar información
              básica como el nombre del restaurante, su dirección, teléfono, y
              cualquier otro dato relevante. Al agregar esta información, te
              asegurarás de que tu restaurante esté bien identificado en la
              plataforma y listo para agregar categorías y elementos del menú.
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
              <strong>Agregar Categorías:</strong> Una vez que hayas agregado un
              restaurante, el siguiente paso es organizar tus platillos en
              categorías. Esto te ayudará a mantener un menú organizado y
              permitirá a los clientes encontrar fácilmente los platillos que
              desean. Para agregar una nueva categoría, selecciona un
              restaurante y haz clic en el botón "Más", que te dará la opción de
              "Agregar categoría". Aquí podrás crear categorías como "Entradas",
              "Platos principales", "Postres", y mucho más. De esta forma, cada
              platillo se podrá asociar a su respectiva categoría.
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
              <strong>Agregar Elementos del Menú:</strong> Después de organizar
              tus categorías, puedes empezar a agregar los platillos a cada una
              de ellas. Para agregar un nuevo platillo, haz clic en el botón
              "Agregar item" que verás en el área de categorías. Aquí podrás
              ingresar el nombre del platillo, su precio, una descripción
              detallada, y una imagen que lo represente. Asegúrate de
              seleccionar la categoría correcta para que el platillo se muestre
              en el lugar adecuado dentro del menú.
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
              Si deseas volver a consultar esta guía en el futuro, puedes abrirla
              nuevamente haciendo clic en el botón de "Ayuda" que se encuentra en
              la esquina superior derecha de la pantalla. ¡Esperamos que disfrutes
              usando Foodie App y que te ayude a gestionar tu restaurante de
              manera eficiente!
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
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>Guía de Uso - Foodie App</ModalHeader>
        <ModalBody>
          <Box>{renderContent()}</Box>
        </ModalBody>

        <ModalFooter>
          {page > 1 && (
            <Button onClick={prevPage} mr={3} fontSize={{ base: "sm", md: "md" }}>
              Anterior
            </Button>
          )}
          {page < 5 && (
            <Button onClick={nextPage} mr={3} fontSize={{ base: "sm", md: "md" }}>
              Siguiente
            </Button>
          )}
          <Button variant="ghost" onClick={onClose} fontSize={{ base: "sm", md: "md" }}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
