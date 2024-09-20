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
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import {
  updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants"; // Import the update and delete functions

const UpdateDeleteRestaurantModal = ({
  isOpen, // Controls the visibility of the modal
  onClose, // Function to close the modal
  initialData, // The restaurant data to edit
  onDeleteSuccess, // Callback for successful deletion
  onUpdateSuccess, // Callback for successful update
}) => {
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null, // To handle the logo file uploads
  });

  // Populate the form with the initial restaurant data for editing
  useEffect(() => {
    if (initialData) {
      setRestaurantDetails({
        ...initialData,
        logo: null, // Reset the logo file to avoid passing old data
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

  // Handle logo file upload
  const handleFileChange = (e) => {
    setRestaurantDetails((prevState) => ({
      ...prevState,
      logo: e.target.files[0],
    }));
  };

  // Submit form for updating the restaurant
  const handleSubmit = async () => {
    try {
      const updatedRestaurant = await updateRestaurant(
        initialData.id,
        restaurantDetails
      );
      toast.success("Restaurant updated successfully!");
      onUpdateSuccess(updatedRestaurant); // Callback to update the UI after success
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating restaurant:", error);
      toast.error("Error updating restaurant.");
    }
  };

  // Handle deletion of the restaurant
  const handleDelete = async () => {
    try {
      await deleteRestaurant(initialData.id);
      toast.success("Restaurant deleted successfully!");
      onDeleteSuccess(initialData.id); // Callback to update the UI after deletion
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      toast.error("Error deleting restaurant.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit or Delete Restaurant</ModalHeader>
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
            <Input type="file" name="logo" onChange={handleFileChange} />
          </FormControl>

          {/* Confirm Deletion */}
          <Text color="red.500" mt={4}>
            Note: Deleting this restaurant will remove all associated data.
          </Text>
        </ModalBody>

        <ModalFooter>
          {/* Delete Button */}
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>

          {/* Save Changes Button */}
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save Changes
          </Button>

          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDeleteRestaurantModal;
