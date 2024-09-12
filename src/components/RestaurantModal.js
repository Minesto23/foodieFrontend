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
} from "@chakra-ui/react";

const RestaurantModal = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialData = null,
}) => {
  // Form state
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo_url: "",
  });

  // Effect to load the initial data if editing
  useEffect(() => {
    if (initialData) {
      setRestaurantDetails(initialData); // Load the initial data into form if available
    } else {
      setRestaurantDetails({
        name: "",
        location: "",
        opening_hours: "",
        contact_email: "",
        contact_phone: "",
        logo_url: "",
      });
    }
  }, [initialData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (for both adding and updating)
  const handleSubmit = () => {
    onSubmit(restaurantDetails);
    onClose(); // Close modal after submission
  };

  // Handle restaurant deletion
  const handleDelete = () => {
    if (onDelete && initialData) {
      onDelete(initialData.id); // Pass the restaurant ID to delete
      onClose(); // Close modal after deletion
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Restaurant" : "Add New Restaurant"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Restaurant Name */}
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
            />
          </FormControl>

          {/* Restaurant Location */}
          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Main St"
            />
          </FormControl>

          {/* Opening Hours */}
          <FormControl mb={4}>
            <FormLabel>Opening Hours</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
            />
          </FormControl>

          {/* Contact Email */}
          <FormControl mb={4}>
            <FormLabel>Contact Email</FormLabel>
            <Input
              name="contact_email"
              type="email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="contact@restaurant.com"
            />
          </FormControl>

          {/* Contact Phone */}
          <FormControl mb={4}>
            <FormLabel>Contact Phone</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
            />
          </FormControl>

          {/* Logo URL */}
          <FormControl mb={4}>
            <FormLabel>Logo URL</FormLabel>
            <Input
              name="logo_url"
              value={restaurantDetails.logo_url}
              onChange={handleChange}
              placeholder="http://example.com/logo.png"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {initialData && (
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
