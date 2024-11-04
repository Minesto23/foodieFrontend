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
import toast from "react-hot-toast";
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants";

const RestaurantModal = ({
  isOpen,
  onClose,
  initialData = null,
}) => {
  const [loading, setLoading] = useState(false);

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    opening_hours: "",
    contact_email: "",
    contact_phone: "",
    logo: null,
    s3: null,
  });

  const resetForm = () => {
    setRestaurantDetails({
      name: "",
      location: "",
      opening_hours: "",
      contact_email: "",
      contact_phone: "",
      logo: null,
      s3: null,
    });
  };

  useEffect(() => {
    if (initialData) {
      setRestaurantDetails({
        ...initialData,
        logo: null,
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setRestaurantDetails((prevState) => ({
      ...prevState,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    toast.loading("Cargando datos, por favor espere...");
    setLoading(true);

    try {
      const restaurantPayload = { ...restaurantDetails };

      if (initialData) {
        await updateRestaurant(initialData.id, restaurantPayload);
        toast.success("¡Restaurante actualizado con éxito!");
      } else {
        await createRestaurant(restaurantPayload);
        toast.success("¡Restaurante creado con éxito!");
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario del restaurante:", error);
      toast.error("Error al guardar el restaurante. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (initialData) {
      try {
        await deleteRestaurant(initialData.id);
        onClose();
        toast.success("¡Restaurante eliminado con éxito!");
        resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar el restaurante:", error);
        toast.error("Error al eliminar el restaurante. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
          {initialData ? "Editar Restaurante" : "Agregar Nuevo Restaurante"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Nombre del Restaurante</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Nombre del Restaurante"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Ubicación</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Calle Principal"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Horario de Apertura</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Email de Contacto</FormLabel>
            <Input
              name="contact_email"
              type="email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="contacto@restaurante.com"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Teléfono de Contacto</FormLabel>
            <Input
              name="contact_phone"
              value={restaurantDetails.contact_phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              maxLength={100}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Logo</FormLabel>
            <Input
              name="logo"
              type="file"
              onChange={handleFileChange}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {initialData && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={loading}
              spinner={<Spinner size="sm" />}
              fontSize={{ base: "sm", md: "md" }}
            >
              Eliminar
            </Button>
          )}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
            spinner={<Spinner size="sm" />}
            fontSize={{ base: "sm", md: "md" }}
          >
            {initialData ? "Guardar Cambios" : "Agregar Restaurante"}
          </Button>
          <Button variant="ghost" onClick={onClose} fontSize={{ base: "sm", md: "md" }}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantModal;
