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

const Header = ({ onSelectRestaurant }) => {
  const { restaurants, fetchAllRestaurants } = useRestaurantContext();
  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen((prevState) => !prevState);

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const openRestaurantModal = () => setIsRestaurantModalOpen(true);
  const closeRestaurantModal = () => setIsRestaurantModalOpen(false);

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetchAllRestaurants();
    if (selectedRestaurant == null) {
      setSelectedRestaurant(restaurants[0]);
    }
  }, [isRestaurantModalOpen, isHelpModalOpen, isExportModalOpen, fetchAllRestaurants]);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onSelectRestaurant(restaurant);
  };

  const handleLogout = () => {
    // console.log("Logging out...");
    navigate("/login");
  };

  const handleAddRestaurant = (restaurantDetails) => {
    console.log("New Restaurant Details:", restaurantDetails);
  };

  const isRestaurantPage = /^\/restaurant\/\d+/.test(location.pathname);

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.900"} px={6}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" pl={{ base: 2, md: 10 }}>
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

        {/* Mobile Menu Toggle */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={onToggle}
        />

        {/* Desktop Navigation Menu */}
        {!isRestaurantPage && (
          <Flex display={{ base: "none", md: "flex" }} alignItems="center">
            <Stack direction="row" spacing={4}>
              {location.pathname === "/home" ? (
                <>
                  <Button onClick={openExportModal} colorScheme="red">
                    Export
                  </Button>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="red">
                      Restaurants
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
                      <MenuItem icon={<AddIcon />} onClick={openRestaurantModal} color="green.500">
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
                  <Link href="/register" px={2} py={1} rounded="md" _hover={{ bg: "gray.200" }}>
                    Register
                  </Link>
                  <Link href="/login" px={2} py={1} rounded="md" _hover={{ bg: "gray.200" }}>
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

      {/* Mobile Menu Links */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {location.pathname === "/home" ? (
              <>
                <Button onClick={openExportModal} colorScheme="red" width="full">
                  Export
                </Button>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="red" width="full">
                    Restaurants
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
                    <MenuItem icon={<AddIcon />} onClick={openRestaurantModal} color="green.500">
                      Add Restaurant
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button onClick={handleLogout} colorScheme="red" width="full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/register" onClick={onToggle}>
                  Register
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

      {/* Modals */}
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
