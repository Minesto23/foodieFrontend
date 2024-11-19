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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Text,
  Box,
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
    s3: null,
    restaurant_type: [],
    services: [],
  });

  const categories = [
    { value: "panaderia", label: "Panaderia" },
    { value: "carne_pescado", label: "Carne y Pescado" },
    { value: "cafeteria", label: "Cafetería" },
    { value: "bar", label: "Bar" },
    { value: "americana", label: "Americana" },
    { value: "barbacoa", label: "Barbacoa" },
    { value: "hamburguesas", label: "Hamburguesas" },
    { value: "asiatica", label: "Asiática" },
    { value: "china", label: "China" },
    { value: "japonesa", label: "Japonesa" },
    { value: "italiana", label: "Italiana" },
    { value: "francesa", label: "Francesa" },
    { value: "fusion", label: "Fusión" },
    { value: "saludable", label: "Saludable" },
    { value: "parrilla", label: "Parrilla" },
    { value: "casera", label: "Casera" },
    { value: "helados", label: "Helados" },
    { value: "india", label: "India" },
    { value: "internacional", label: "Internacional" },
    { value: "latina", label: "Latina" },
    { value: "mexicana", label: "Mexicana" },
    { value: "pizza", label: "Pizza" },
    { value: "peruana", label: "Peruana" },
    { value: "comida_marina", label: "Comida Marina" },
    { value: "espanola", label: "Española" },
    { value: "comida_callejera", label: "Comida Callejera" },
    { value: "sushi", label: "Sushi" },
    { value: "tacos", label: "Tacos" },
    { value: "vegan", label: "Vegan" },
    { value: "vegetariana", label: "Vegetariana" },
  ];

  const services = [
    { value: "order_online", label: "Order Online" },
    { value: "delivery", label: "Delivery" },
    { value: "pick_up", label: "Pick up" },
    { value: "acepta_tarjeta", label: "Acepta tarjeta" },
    { value: "acepta_btc", label: "Acepta BTC" },
    { value: "acepta_efectivo", label: "Acepta Efectivo" },
    { value: "acepta_pago_movil", label: "Acepta Pago Móvil" },
    { value: "parking", label: "Parking" },
    { value: "ac", label: "A/C" },
    { value: "wifi", label: "WIFI" },
    { value: "live_music", label: "Live Music" },
    { value: "pet_friendly", label: "Pet Friendly" },
    { value: "catering", label: "Catering" },
    { value: "wc_access", label: "WC Access" },
    { value: "tv", label: "TV" },
    { value: "bar", label: "Bar" },
  ];

  const resetForm = () => {
    setRestaurantDetails({
      name: "",
      location: "",
      opening_hours: "",
      contact_email: "",
      contact_phone: "",
      logo: null,
      s3: null,
      restaurant_type: [],
      services: [],
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

  const handleToggle = (value, key) => {
    setRestaurantDetails((prevState) => {
      const currentValues = prevState[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prevState, [key]: updatedValues };
    });
  };

  const handleSubmit = async () => {
    toast.loading("Cargando datos, por favor espere...");
    setLoading(true);

    try {
      const restaurantPayload = {
        ...restaurantDetails,
        restaurant_type: restaurantDetails.restaurant_type,
        services: restaurantDetails.services,
      };

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
        toast.success("¡Restaurante eliminado con éxito!");
        resetForm();
        onClose();
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
            <FormLabel>Nombre del Restaurante</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Nombre del Restaurante"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Ubicación</FormLabel>
            <Input
              name="location"
              value={restaurantDetails.location}
              onChange={handleChange}
              placeholder="123 Calle Principal"
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
              type="email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="contact@restaurant.com"
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
            <FormLabel>Logo</FormLabel>
            <Input type="file" name="logo" onChange={handleFileChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Tipo de Restaurante</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width="100%"
              >
                Seleccionar Tipos
              </MenuButton>
              <MenuList>
                <SimpleGrid columns={3} spacing={2} p={2}>
                  {categories.map(({ value, label }) => (
                    <Flex
                      key={value}
                      alignItems="center"
                      justifyContent="start"
                    >
                      <Switch
                        isChecked={restaurantDetails.restaurant_type.includes(
                          value
                        )}
                        onChange={() => handleToggle(value, "restaurant_type")}
                      />
                      <Text>{label}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </MenuList>
            </Menu>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Servicios</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width="100%"
              >
                Seleccionar Servicios
              </MenuButton>
              <MenuList>
                <SimpleGrid columns={3} spacing={2} p={2}>
                  {services.map(({ value, label }) => (
                    <Flex key={value} alignItems="start" justifyContent="start">
                      <Switch
                        isChecked={restaurantDetails.services.includes(value)}
                        onChange={() => handleToggle(value, "services")}
                      />
                      <Text>{label}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </MenuList>
            </Menu>
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
              Eliminar
            </Button>
          )}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
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
