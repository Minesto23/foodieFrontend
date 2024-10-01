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
  Spinner,
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
}) => {
  // State to handle form submission loading state
  const [loading, setLoading] = useState(false);

  // Initial state for restaurant form fields
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null, // To handle logo file uploads
    s3: null,
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
        s3: null,
      });
    }
  }, [initialData]);

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
  };

  // Function to handle form submission (create or update restaurant)
  const handleSubmit = async () => {
    // Show loading toast
    toast.loading("Cargando datos, por favor espere...");
    setLoading(true); // Start loading spinner

    try {
      const encodedS3Url = encodeURI(restaurantDetails.s3);

      const restaurantPayload = {
        ...restaurantDetails,
        // s3: encodedS3Url, // Ensure restaurant ID is sent
      };

      if (initialData) {
        // If editing, call updateRestaurant
        await updateRestaurant(initialData.id, restaurantPayload);
        toast.success("¡Restaurante actualizado con éxito!"); // Success notification in Spanish
      } else {
        // If creating, call createRestaurant
        await createRestaurant(restaurantPayload);
        toast.success("¡Restaurante creado con éxito!"); // Success notification in Spanish
      }

      onClose(); // Close the modal

      // Reload the page
      // window.location.reload(); // This will refresh the entire page
    } catch (error) {
      console.error("Error al enviar el formulario del restaurante:", error);
      toast.error(
        "Error al guardar el restaurante. Inténtalo de nuevo.",
        error
      ); // Error notification in Spanish
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Function to handle restaurant deletion
  const handleDelete = async () => {
    setLoading(true); // Start loading spinner during deletion
    if (initialData) {
      try {
        await deleteRestaurant(initialData.id); // Delete the restaurant by ID
        onClose(); // Close the modal
        toast.success("¡Restaurante eliminado con éxito!"); // Success notification in Spanish
        // window.location.reload(); // Reload the page after deletion
      } catch (error) {
        console.error("Error al eliminar el restaurante:", error);
        toast.error("Error al eliminar el restaurante. Inténtalo de nuevo."); // Error notification in Spanish
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Editar Restaurante" : "Agregar Nuevo Restaurante"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Restaurant Name Input */}
          <FormControl mb={4}>
            <FormLabel>Nombre del Restaurante</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Nombre del Restaurante"
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          {/* Restaurant Location Input */}
          <FormControl mb={4}>
            <FormLabel>Ubicación</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Calle Principal"
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          {/* Restaurant Opening Hours Input */}
          <FormControl mb={4}>
            <FormLabel>Horario de Apertura</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          {/* Contact Email Input */}
          <FormControl mb={4}>
            <FormLabel>Email de Contacto</FormLabel>
            <Input
              name="contact_email"
              type="email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="contacto@restaurante.com"
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          {/* Contact Phone Input */}
          <FormControl mb={4}>
            <FormLabel>Teléfono de Contacto</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              maxLength={100} // Limiting the input to 100 characters
            />
          </FormControl>

          {/* Logo File Upload */}
          <FormControl mb={4}>
            <FormLabel>Logo</FormLabel>
            <Input
              name="logo"
              type="file"
              onChange={handleFileChange} // Handle file uploads
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {initialData && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={loading} // Loading state for Delete
              spinner={<Spinner size="sm" />}
            >
              Eliminar
            </Button>
          )}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading} // Loading state for Save
            spinner={<Spinner size="sm" />}
          >
            {initialData ? "Guardar Cambios" : "Agregar Restaurante"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantModal;
