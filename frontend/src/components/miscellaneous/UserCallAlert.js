import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const UserCallAlert = ({ call }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <div>
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="300px">
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color={"gray.900"}
              fontSize="3xl"
              fontWeight={"bold"}
              fontFamily="Work sans"
            >
              {call.name} is calling...
            </Text>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-around">
            <Button colorScheme="whatsapp">
              {" "}
              <Link to={"/videoChat"}>Accept </Link>
            </Button>

            <Button colorScheme="red" onClick={onClose}>
              Decline
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserCallAlert;
