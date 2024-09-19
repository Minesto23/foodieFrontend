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
import toast from "react-hot-toast"; // Import toast for notifications
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants"; // Import your controller functions

const RestaurantModal = ({
  isOpen, // Controls if the modal is visible
  onClose, // Function to close the modal
  initialData = null, // Initial data for editing (if provided)
  // refreshData, // Function to refresh the restaurant list after operations
}) => {
  // Initial state for restaurant form fields
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null, // To handle logo file uploads
  });

  // Effect to load the initial data when editing an existing restaurant
  useEffect(() => {
    if (initialData) {
      // Populate form with existing restaurant data
      setRestaurantDetails({
        ...initialData,
        logo: null, // Reset the logo to avoid old URL being passed
      });
    } else {
      // Reset form for new restaurant creation
      setRestaurantDetails({
        name: "",
        location: "",
        opening_hours: "",
        contact_email: "",
        contact_phone: "",
        logo: null,
      });
    }
  }, [initialData]);

  console.log(restaurantDetails, "el senor almibape");

  // Function to handle form field changes (for both text inputs and logo file)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file upload for logo (e.g., uploading a logo image to S3)
  const handleFileChange = (e) => {
    setRestaurantDetails((prevState) => ({
      ...prevState,
      logo: e.target.files[0], // Store the file object when selected
    }));
    console.log(e.target.files[0], "Terrenaitor");
  };

  // Function to handle form submission (create or update restaurant)
  const handleSubmit = async () => {
    try {
      if (initialData) {
        // If editing, call updateRestaurant
        const response = await updateRestaurant(
          initialData.id,
          restaurantDetails
        );
        toast.success("Restaurant updated successfully!"); // Success notification
      } else {
        // If creating, call createRestaurant
        await createRestaurant(restaurantDetails);
        toast.success("Restaurant added successfully!"); // Success notification
      }
      // refreshData(); // Refresh the restaurant list after changes
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting restaurant form:", error);
      toast.error("Error saving restaurant. Please try again."); // Error notification
    }
  };

  // Function to handle restaurant deletion
  const handleDelete = async () => {
    if (initialData) {
      try {
        await deleteRestaurant(initialData.id); // Delete the restaurant by ID
        // refreshData(); // Refresh the restaurant list after deletion
        onClose(); // Close the modal
        toast.success("Restaurant deleted successfully!"); // Success notification
      } catch (error) {
        console.error("Error deleting restaurant:", error);
        toast.error("Error deleting restaurant. Please try again."); // Error notification
      }
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
          {/* Restaurant Name Input */}
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
            />
          </FormControl>

          {/* Restaurant Location Input */}
          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Main St"
            />
          </FormControl>

          {/* Restaurant Opening Hours Input */}
          <FormControl mb={4}>
            <FormLabel>Opening Hours</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
            />
          </FormControl>

          {/* Contact Email Input */}
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

          {/* Contact Phone Input */}
          <FormControl mb={4}>
            <FormLabel>Contact Phone</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
            />
          </FormControl>

          {/* Logo File Upload */}
          <FormControl mb={4}>
            <FormLabel>Logo</FormLabel>
            <Input
              name="logo"
              type="file"
              // value={restaurantDetails.logo}
              onChange={handleFileChange} // Handle file uploads
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
