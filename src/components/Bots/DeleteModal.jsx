import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

export default function DeleteModal({ isOpen, onClose, handleDelete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={"#414345"} color={"#ffffff"}>
        <ModalHeader fontWeight={"450"}>
          Delete Bot
          <ModalCloseButton
            borderRadius={"full"}
            _hover={{
              bg: "linear-gradient(to right, #4e54c8, #8f94fb)",
              color: "white",
            }}
          />
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this bot?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            borderRadius={"full"}
            bg={"linear-gradient(to right, #4568dc, #b06ab3)"}
            color={"#ffffff"}
            fontWeight={"400"}
            _hover={{
              bg: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
            leftIcon={<IoCloseOutline size={20} />}
          >
            Close
          </Button>
          <Button
            colorScheme="red"
            onClick={handleDelete}
            bg={"linear-gradient(to right, #F44336, #E57373)"}
            _hover={{
              bg: "linear-gradient(to right, #D32F2F, #EF5350)",
            }}
            borderRadius={"full"}
            rightIcon={<AiOutlineDelete color="white" fontSize={"20px"} />}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
