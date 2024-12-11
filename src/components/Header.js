import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorMode,
  Stack,
  Link,
  Image,
  IconButton,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  AddIcon,
  QuestionIcon,
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import CreateRestaurantModal from "./RestaurantModalCreate";
import HelpModal from "./HelpModal";
import ExportModal from "./ExportModal";
import { useRestaurantContext } from "../context/RestaurantContext";
import { Link as ChakraLink } from "@chakra-ui/react";

/**
 * Componente Header que contiene la navegación principal, opciones de usuario
 * y modales para funcionalidades adicionales.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.onSelectRestaurant - Función para manejar la selección de un restaurante.
 * @returns {React.Component} Header.
 */
const Header = ({ onSelectRestaurant }) => {
  const { restaurants, fetchAllRestaurants } = useRestaurantContext();
  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();
  const navigate = useNavigate();

  // Estado para controlar el menú móvil
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen((prevState) => !prevState);

  // Estado para los modales
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Efecto para cargar restaurantes al montar el componente
  useEffect(() => {
    fetchAllRestaurants();
    if (!selectedRestaurant && restaurants.length > 0) {
      setSelectedRestaurant(restaurants[0]);
    }
  }, [
    isRestaurantModalOpen,
    isHelpModalOpen,
    isExportModalOpen,
    fetchAllRestaurants,
  ]);

  /**
   * Maneja la selección de un restaurante.
   *
   * @param {Object} restaurant - Restaurante seleccionado.
   */
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onSelectRestaurant(restaurant);
  };

  /**
   * Maneja el cierre de sesión.
   */
  const handleLogout = () => {
    navigate("/login");
  };

  /**
   * Verifica si el usuario está en una página específica de restaurante.
   *
   * @returns {boolean} Verdadero si el usuario está en una página de restaurante.
   */
  const isRestaurantPage = /^\/restaurant\/\d+/.test(location.pathname);

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.900"} px={6}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo y título */}
        <ChakraLink href="https://detipfoodiee.netlify.app/home" isExternal>
          <Flex alignItems="center" pl={{ base: 2, md: 10 }} cursor="pointer">
            <Image
              src="/logo192.png"
              alt="Logo"
              boxSize={{ base: "30px", md: "40px" }}
              objectFit="cover"
              mr={2}
            />
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" ml={3}>
              Foodie
            </Text>
          </Flex>
        </ChakraLink>

        {/* Mensaje central */}
        <Flex
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          display={{ base: "none", md: "flex" }}
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            title="Si encuentras errores, por favor contáctanos."
            textAlign="center"
          >
            Estamos en fase beta. Si encuentras errores, por favor contáctanos.
          </Text>
        </Flex>

        {/* Botón para menú móvil */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Abrir Menú"
          display={{ md: "none" }}
          onClick={onToggle}
        />

        {/* Menú de navegación (versión escritorio) */}
        {!isRestaurantPage && (
          <Flex display={{ base: "none", md: "flex" }} alignItems="center">
            <Stack direction="row" spacing={4}>
              {location.pathname === "/home" ? (
                <>
                  <Button
                    onClick={() => setIsExportModalOpen(true)}
                    colorScheme="red"
                  >
                    Exportar
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="red"
                    >
                      Restaurantes
                    </MenuButton>
                    <MenuList>
                      {restaurants.length > 0 ? (
                        restaurants.map((restaurant) => (
                          <MenuItem
                            key={restaurant.id}
                            onClick={() => handleSelectRestaurant(restaurant)}
                          >
                            {restaurant.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>No hay restaurantes disponibles</MenuItem>
                      )}
                      <MenuItem
                        icon={<AddIcon />}
                        onClick={() => setIsRestaurantModalOpen(true)}
                      >
                        Agregar Restaurante
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Button onClick={handleLogout} colorScheme="red">
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{ bg: "gray.200" }}
                  >
                    Registrarse
                  </Link>
                  <Link
                    href="/login"
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{ bg: "gray.200" }}
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={() => setIsHelpModalOpen(true)} variant="ghost">
                <QuestionIcon />
              </Button>
            </Stack>
          </Flex>
        )}
      </Flex>

      {/* Menú móvil */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {location.pathname === "/home" ? (
              <>
                <Button
                  onClick={() => setIsExportModalOpen(true)}
                  colorScheme="red"
                  width="full"
                >
                  Exportar
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="red"
                    width="full"
                  >
                    Restaurantes
                  </MenuButton>
                  <MenuList>
                    {restaurants.length > 0 ? (
                      restaurants.map((restaurant) => (
                        <MenuItem
                          key={restaurant.id}
                          onClick={() => handleSelectRestaurant(restaurant)}
                        >
                          {restaurant.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No hay restaurantes disponibles</MenuItem>
                    )}
                    <MenuItem
                      icon={<AddIcon />}
                      onClick={() => setIsRestaurantModalOpen(true)}
                    >
                      Agregar Restaurante
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button onClick={handleLogout} colorScheme="red" width="full">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/register">Registrarse</Link>
                <Link href="/login">Iniciar Sesión</Link>
              </>
            )}
            <Button onClick={toggleColorMode} width="full">
              {colorMode === "light" ? "Modo Oscuro" : "Modo Claro"}
            </Button>
            <Button
              onClick={() => setIsHelpModalOpen(true)}
              width="full"
              variant="ghost"
            >
              Ayuda
            </Button>
          </Stack>
        </Box>
      </Collapse>

      {/* Modales */}
      <CreateRestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setIsRestaurantModalOpen(false)}
      />
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        restaurantId={selectedRestaurant?.id}
      />
    </Box>
  );
};

export default Header;
