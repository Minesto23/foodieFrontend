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
  // IconButton,
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
} from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import CreateRestaurantModal from "./RestaurantModalCreate";
import HelpModal from "./HelpModal";
import ExportModal from "./ExportModal";
import { useRestaurantContext } from "../context/RestaurantContext"; // Import the RestaurantContext

const Header = ({ onSelectRestaurant }) => {
  const { restaurants, fetchAllRestaurants } = useRestaurantContext(); // Use context to fetch restaurants
  const { colorMode, toggleColorMode } = useColorMode();

  // Obtener la ruta actual usando useLocation
  const location = useLocation();
  const navigate = useNavigate();

  // Estado para el menú móvil
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen((prevState) => !prevState);

  // Estado para el modal de restaurantes
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const openRestaurantModal = () => setIsRestaurantModalOpen(true);
  const closeRestaurantModal = () => setIsRestaurantModalOpen(false);

  // Estado para el modal de ayuda
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);

  // Estado para el modal de exportar
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  // Estado para el restaurante seleccionado
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Obtener todos los restaurantes al montar el componente
  useEffect(() => {
    fetchAllRestaurants(); // Fetch restaurants when component mounts
  }, [isRestaurantModalOpen, isHelpModalOpen, isExportModalOpen, fetchAllRestaurants]);

  // Manejar la selección de un restaurante
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onSelectRestaurant(restaurant); // Actualizar el estado en el componente padre
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  // Manejar la adición de un nuevo restaurante
  const handleAddRestaurant = (restaurantDetails) => {
    console.log("New Restaurant Details:", restaurantDetails);
    // Lógica para manejar la adición de un nuevo restaurante
  };

  // Patrón de expresión regular para detectar la URL /restaurant/:id
  const isRestaurantPage = /^\/restaurant\/\d+/.test(location.pathname);

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.900"} px={6}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Flex alignItems="center" pl={10}>
          <Image
            src="/logo192.png" // Añade la ruta de tu logo aquí
            alt="Logo"
            boxSize={{ base: "30px", md: "40px" }}
            objectFit="cover"
            mr={2}
          />
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" ml={3}>
            Foodie
          </Text>
        </Flex>

        {/* Condicional para mostrar navegación si NO estamos en /restaurant/:id */}
        {!isRestaurantPage && (
          <Flex display={{ base: "none", md: "flex" }} alignItems="center">
            <Stack direction="row" spacing={7}>
              {location.pathname === "/home" ? (
                <>
                  <Button onClick={openExportModal} colorScheme="red">
                    Export
                  </Button>
                  {/* Menú desplegable de restaurantes */}
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
                        <MenuItem>No restaurants available</MenuItem>
                      )}
                      <MenuItem
                        icon={<AddIcon />}
                        onClick={openRestaurantModal}
                        color="green.500"
                      >
                        Add Restaurant
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Button onClick={handleLogout} colorScheme="red">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{ textDecoration: "none", bg: "gray.200" }}
                  >
                    Registro
                  </Link>
                  <Link
                    href="/login"
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{ textDecoration: "none", bg: "gray.200" }}
                  >
                    Login
                  </Link>
                </>
              )}
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={openHelpModal} variant="ghost">
                <QuestionIcon />
              </Button>
            </Stack>
          </Flex>
        )}
      </Flex>

      {/* Enlaces del menú móvil */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {location.pathname === "/home" ? (
              <>
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
                      <MenuItem>No restaurants available</MenuItem>
                    )}
                    <MenuItem
                      icon={<AddIcon />}
                      onClick={openRestaurantModal}
                      color="green.500"
                    >
                      Add Restaurant
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button onClick={handleLogout} colorScheme="red">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/register" onClick={onToggle}>
                  Registro
                </Link>
                <Link href="/login" onClick={onToggle}>
                  Login
                </Link>
              </>
            )}
            <Button onClick={toggleColorMode} width="full">
              {colorMode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
            <Button onClick={openHelpModal} width="full" variant="ghost">
              Help
            </Button>
          </Stack>
        </Box>
      </Collapse>

      {/* Modales */}
      <CreateRestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={closeRestaurantModal}
        onCreateSuccess={handleAddRestaurant}
      />
      <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={closeExportModal}
        restaurantId={selectedRestaurant?.id}
      />
    </Box>
  );
};

export default Header;
