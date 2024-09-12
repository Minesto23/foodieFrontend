import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

const HelpModal = ({ isOpen, onClose }) => {
  const [page, setPage] = useState(1); // State to track current page

  const nextPage = () => {
    if (page < 4) {
      // Updated to 4 pages
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <Box>
            <Text mb={4}>
              Welcome to the Foodie app! Here you can manage restaurants and
              food items.
            </Text>
            <Image
              src="/logo192.png" // Replace with the actual path of the image
              alt="Welcome Image"
              boxSize="200px"
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Text mb={4}>
              Add restaurants: To add a new restaurant click on the resturantes
              button and next in add restaurant.
            </Text>
            <Image
              src="/page2.png" // Replace with the actual path of the image
              alt="Menu Bar Navigation"
              boxSize="200px"
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Text mb={4}>
              add Category: To add category click on more button.
            </Text>
            <Image
              src="/page3.png" // Replace with the actual path of the image
              alt="Edit or Delete Food Items"
              boxSize="200px"
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            <Text mb={4}>To add item: Click on agregar item buttom.</Text>
            <Image
              src="/page4.png" // Replace with the actual path of the image
              alt="Dashboard Insights"
              boxSize="200px"
              objectFit="cover"
              mx="auto"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalBody>
          <Box>{renderContent()}</Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={prevPage} disabled={page === 1} mr={3}>
            Previous
          </Button>
          <Button onClick={nextPage} disabled={page === 4} mr={3}>
            Next
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
