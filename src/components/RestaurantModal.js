import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Switch,
  Text,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants";

const RestaurantModal = ({ isOpen, onClose, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null,
    restaurant_type: [],
    services: [],
  });

  const categories = [
    { value: "panaderia", label: "Panaderia" },
    { value: "carne_pescado", label: "Carne y Pescado" },
    { value: "cafeteria", label: "Cafetería" },
    { value: "bar", label: "Bar" },
    // Add more categories...
  ];

  const services = [
    { value: "order_online", label: "Order Online" },
    { value: "delivery", label: "Delivery" },
    { value: "pick_up", label: "Pick up" },
    // Add more services...
  ];

  const resetForm = () => {
    setRestaurantDetails({
      name: "",
      location: "",
      opening_hours: "",
      contact_email: "",
      contact_phone: "",
      logo: null,
      restaurant_type: [],
      services: [],
    });
  };

  useEffect(() => {
    if (initialData) {
      setRestaurantDetails({
        ...initialData,
        logo: null, // Exclude the logo for updates
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (value, key) => {
    setRestaurantDetails((prev) => {
      const currentValues = Array.isArray(prev[key]) ? prev[key] : [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: updatedValues };
    });
  };

  const handleSubmit = async () => {
    toast.loading("Processing...");
    setLoading(true);

    try {
      if (initialData) {
        await updateRestaurant(initialData.id, restaurantDetails);
        toast.success("Restaurant updated successfully!");
      } else {
        await createRestaurant(restaurantDetails);
        toast.success("Restaurant created successfully!");
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to save the restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    setLoading(true);

    try {
      await deleteRestaurant(initialData.id);
      toast.success("Restaurant deleted successfully!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Deletion Error:", error);
      toast.error("Failed to delete the restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderSwitchList = (list, key) => (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
        Select Options
      </MenuButton>
      <MenuList>
        <SimpleGrid columns={3} spacing={2} p={2}>
          {list.map(({ value, label }) => (
            <Flex key={value} alignItems="center">
              <Switch
                isChecked={
                  Array.isArray(restaurantDetails[key]) &&
                  restaurantDetails[key].includes(value)
                }
                onChange={() => handleToggle(value, key)}
              />
              <Text ml={2}>{label}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Restaurant" : "Add Restaurant"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Main Street"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Opening Hours</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Contact Email</FormLabel>
            <Input
              name="contact_email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Contact Phone</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Restaurant Type</FormLabel>
            {renderSwitchList(categories, "restaurant_type")}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Services</FormLabel>
            {renderSwitchList(services, "services")}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {initialData && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={loading}
            >
              Delete
            </Button>
          )}
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
            {initialData ? "Save Changes" : "Add Restaurant"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantModal;
