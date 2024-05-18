import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function DetailsModal({ isOpen, onClose, selectedBot }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedBot && (
            <>
              <Heading fontSize="md">{selectedBot.name}</Heading>
              <Text color="gray.500">
                Personality: {selectedBot.personality}
              </Text>
            </>
          )}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody px={4} py={2}>
          <Text>{selectedBot && selectedBot.description}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
