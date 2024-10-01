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
  const [page, setPage] = useState(1); // State to track current page

  const nextPage = () => {
    if (page < 7) {
      // Actualizado a 7 páginas
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
            <Text mb={4}>
              ¡Bienvenido a la aplicación Foodie! Esta plataforma ha sido
              diseñada para ayudarte a gestionar tus restaurantes, categorías de
              comida y elementos del menú de forma sencilla y eficiente. Aquí
              podrás controlar todos los aspectos relacionados con la operación
              de un restaurante, desde agregar un nuevo establecimiento hasta
              gestionar cada platillo del menú. Sigue esta guía paso a paso para
              aprender cómo usar todas las funcionalidades de la app.
            </Text>
            <Image
              src="/logo192.png" // Reemplaza con la ruta real de la imagen
              alt="Imagen de Bienvenida"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Text mb={4}>
              <strong>Agregar restaurantes:</strong> Para comenzar, lo primero
              que debes hacer es agregar tu restaurante. Dirígete a la parte
              superior de la página y haz clic en el botón "Restaurantes". Desde
              allí, selecciona "Agregar restaurante". A continuación, se abrirá
              un formulario en el que deberás completar información básica como
              el nombre del restaurante, su dirección, teléfono, y cualquier
              otro dato relevante. Al agregar esta información, te asegurarás de
              que tu restaurante esté bien identificado en la plataforma y listo
              para agregar categorías y elementos del menú.
            </Text>
            <Image
              src="/page2.png" // Reemplaza con la ruta real de la imagen
              alt="Agregar Restaurante"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Text mb={4}>
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
              src="/page3.png" // Reemplaza con la ruta real de la imagen
              alt="Agregar Categoría"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            <Text mb={4}>
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
              src="/page4.png" // Reemplaza con la ruta real de la imagen
              alt="Agregar Elemento del Menú"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 5:
        return (
          <Box>
            <Text mb={4}>
              <strong>Editar Elementos del Menú:</strong> En cualquier momento,
              podrás modificar los platillos que hayas agregado. Para ello,
              selecciona el platillo en cuestión y haz clic en el botón de
              editar. Desde esta sección, podrás actualizar detalles como el
              precio, la descripción o cambiar la imagen del platillo. Esto es
              útil cuando realizas cambios en el menú o ajustes de precios.
            </Text>
            <Image
              src="/page5.png" // Reemplaza con la ruta real de la imagen
              alt="Editar Elemento del Menú"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 6:
        return (
          <Box>
            <Text mb={4}>
              <strong>Eliminar Elementos del Menú:</strong> Si necesitas
              eliminar un platillo del menú, puedes hacerlo fácilmente.
              Selecciona el platillo que deseas eliminar y haz clic en el botón
              "Eliminar". Aparecerá una confirmación, ya que esta acción es
              irreversible. Al confirmar, el platillo desaparecerá del menú y ya
              no estará disponible para los clientes.
            </Text>
            <Image
              src="/page6.png" // Reemplaza con la ruta real de la imagen
              alt="Eliminar Elemento del Menú"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 7:
        return (
          <Box>
            <Text mb={4}>
              <strong>Ver Reportes:</strong> Finalmente, puedes revisar el
              rendimiento de tus restaurantes y los platillos del menú a través
              de la sección de reportes. Aquí obtendrás información detallada
              sobre las ventas, los platillos más populares y las ganancias.
              Esta herramienta es clave para entender mejor lo que está
              funcionando en tu negocio y tomar decisiones basadas en datos para
              optimizar tus operaciones y el menú.
            </Text>
            <Image
              src="/page7.png" // Reemplaza con la ruta real de la imagen
              alt="Ver Reportes"
              boxSize="400px" // Imagen más grande
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      {" "}
      {/* Modal más grande con size="6xl" */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Guía de Uso - Foodie App</ModalHeader>
        <ModalBody>
          <Box>{renderContent()}</Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={prevPage} disabled={page === 1} mr={3}>
            Anterior
          </Button>
          <Button onClick={nextPage} disabled={page === 7} mr={3}>
            Siguiente
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
