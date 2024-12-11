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
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon, IconButton } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../api/controllers/Restaurants";

/**
 * Componente RestaurantModal
 *
 * Muestra un modal para agregar, editar o eliminar un restaurante.
 *
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {object} [initialData=null] - Datos iniciales del restaurante.
 */
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
    latitude: null,
    longitude: null,
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
    { value: "acepta_paypal", label: "Acepta Paypal" },
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

  /**
   * Resetea el formulario a los valores iniciales.
   */
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
      latitude: null,
      longitude: null,
    });
  };

  const [showMap, setShowMap] = useState(false);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = response.data;
      if (data && data.display_name) {
        setRestaurantDetails((prev) => ({
          ...prev,
          location: data.display_name,
          latitude: lat,
          longitude: lon,
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setRestaurantDetails({
        ...initialData,
        logo: null, // Exclude the logo for updates
      });
    } else {
      resetForm();
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchAddress(coords.latitude, coords.longitude);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    }
  }, [initialData]);

  /**
   * Maneja los cambios en los campos del formulario.
   *
   * @param {object} e - Evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setRestaurantDetails((prevState) => ({
      ...prevState,
      logo: e.target.files[0],
    }));
  };

  /**
   * Alterna las opciones de tipo o servicios en el formulario.
   *
   * @param {string} value - Valor de la opción.
   * @param {string} key - Clave del campo en el estado.
   */
  const handleToggle = (value, key) => {
    setRestaurantDetails((prev) => {
      const currentValues = Array.isArray(prev[key]) ? prev[key] : [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: updatedValues };
    });
  };

  /**
   * Maneja la acción de guardar (crear o actualizar) un restaurante.
   */
  const handleSubmit = async () => {
    try {
      if (initialData) {
        await updateRestaurant(initialData.id, restaurantDetails);
        toast.success("¡Restaurante actualizado exitosamente!");
      } else {
        await createRestaurant(restaurantDetails);
        toast.success("¡Restaurante creado exitosamente!");
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      toast.error("Error al guardar el restaurante. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja la acción de eliminar un restaurante.
   */
  const handleDelete = async () => {
    if (!initialData) return;
    setLoading(true);

    try {
      await deleteRestaurant(initialData.id);
      toast.success("¡Restaurante eliminado exitosamente!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al eliminar el restaurante:", error);
      toast.error("Error al eliminar el restaurante. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderiza una lista de switches para seleccionar opciones.
   *
   * @param {array} list - Lista de opciones.
   * @param {string} key - Clave del campo en el estado.
   */
  const renderSwitchList = (list, key) => (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
        Seleccionar Opciones
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

  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt color="red" size={24} />
    ), // Renderiza el ícono como SVG
    className: "custom-leaflet-icon", // Clase para estilos adicionales
    iconSize: [24, 24], // Tamaño del ícono
    iconAnchor: [12, 24], // Punto de anclaje (centro inferior del ícono)
  });

  const handleLocationSelect = (lat, lon) => {
    fetchAddress(lat, lon);
  };

  const MapSelector = () => {
    const LocationMarker = () => {
      useMapEvents({
        click(e) {
          const { lat, lng } = e.latlng;
          handleLocationSelect(lat, lng); // Updates the address and coordinates
        },
      });
      return null;
    };

    return (
      <MapContainer
        center={[
          restaurantDetails.latitude || 20.5937,
          restaurantDetails.longitude || -100.3906,
        ]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurantDetails.latitude && restaurantDetails.longitude && (
          <Marker
            position={[restaurantDetails.latitude, restaurantDetails.longitude]}
            icon={customIcon}
          />
        )}
        <LocationMarker />
      </MapContainer>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Editar Restaurante" : "Agregar Restaurante"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              placeholder="Nombre del Restaurante"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Ubicación</FormLabel>
            <Flex alignItems="center">
              <IconButton
                icon={<Icon as={FaMapMarkerAlt} />}
                onClick={() => setShowMap(!showMap)}
                aria-label="Seleccionar ubicación"
                mr={2}
              />
              <Input
                name="location"
                value={restaurantDetails.location}
                onChange={handleChange}
                placeholder="Dirección (opcional, seleccionada automáticamente)"
              />
            </Flex>
            {showMap && <MapSelector />}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Horario de Apertura</FormLabel>
            <Input
              name="opening_hours"
              value={restaurantDetails.opening_hours}
              onChange={handleChange}
              placeholder="9AM - 9PM"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              name="contact_email"
              value={restaurantDetails.contact_email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Teléfono</FormLabel>
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
            {renderSwitchList(categories, "restaurant_type")}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Servicios</FormLabel>
            {renderSwitchList(services, "services")}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {initialData && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={loading} // Shows spinner during loading
              loadingText="Eliminando..." // Text shown during loading
            >
              Eliminar
            </Button>
          )}
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading} // Shows spinner during loading
            loadingText={initialData ? "Guardando..." : "Agregando..."} // Text shown during loading
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
