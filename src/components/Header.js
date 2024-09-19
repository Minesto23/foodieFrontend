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
  useDisclosure,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  AddIcon,
  QuestionIcon,
} from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import RestaurantModal from "./RestaurantModal"; // Import the RestaurantModal component
import RestaurantName from "./RestaurantName"; // Import RestaurantName component
import HelpModal from "./HelpModal"; // Assuming HelpModal is a separate component
import { getAllRestaurants } from "../api/controllers/Restaurants"; // Import your controllers

const Header = ({ onSelectRestaurant }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure(); // For mobile menu toggle
  const {
    isOpen: isRestaurantModalOpen,
    onOpen: openRestaurantModal,
    onClose: closeRestaurantModal,
  } = useDisclosure(); // Restaurant modal
  const {
    isOpen: isHelpModalOpen,
    onOpen: openHelpModal,
    onClose: closeHelpModal,
  } = useDisclosure(); // Help modal
  const location = useLocation();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // State for selected restaurant

  // Fetch restaurants when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
        if (data.length > 0) {
          setSelectedRestaurant(data[0]);
          onSelectRestaurant(data[0]); // Pass the first restaurant to the parent
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, [onSelectRestaurant]);

  // Handle restaurant selection from the dropdown
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onSelectRestaurant(restaurant); // Call the parent's function to update in the parent
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  // Handle adding a new restaurant
  const handleAddRestaurant = (restaurantDetails) => {
    console.log("New Restaurant Details:", restaurantDetails);
    // You can add the logic here to handle the addition of the restaurant
  };

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.900"} px={6}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Flex alignItems="center" pl={10}>
          <Image
            src="/logo192.png" // Add your logo path here
            alt="Logo"
            boxSize={{ base: "30px", md: "40px" }}
            objectFit="cover"
            mr={2}
          />
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" ml={3}>
            Foodie
          </Text>
        </Flex>

        {/* Desktop Navigation */}
        <Flex display={{ base: "none", md: "flex" }} alignItems="center">
          <Stack direction="row" spacing={7}>
            {location.pathname === "/home" ? (
              <>
                {/* Restaurant dropdown menu */}
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="red"
                  >
                    Restaurantes
                  </MenuButton>
                  <MenuList>
                    {/* Dynamically render restaurant names */}
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

        {/* Mobile Menu Toggle */}
        <Flex display={{ base: "flex", md: "none" }}>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Menu"
            onClick={onToggle}
            variant="ghost"
          />
        </Flex>
      </Flex>

      {/* Mobile Menu Links */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {location.pathname === "/home" ? (
              <>
                {/* Restaurant dropdown for mobile */}
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

      {/* Restaurant Modal for adding/editing a restaurant */}
      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={closeRestaurantModal}
        initialData={selectedRestaurant} // Pass the selected restaurant data for editing
        onSubmit={handleAddRestaurant}
      />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
    </Box>
  );
};

export default Header;
