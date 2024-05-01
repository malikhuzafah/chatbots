import { BASE_URL } from "@/constants/constants";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

export default function CreateModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}api/bots`,
        { name, description, tone },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      console.log(response);
      setLoading(false);
      window.location.reload();
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} size={"lg"} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Create Bot
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection={"column"} gap={4}>
            <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel>Description:</FormLabel>
              <Textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel>Tone:</FormLabel>
              <Input value={tone} onChange={(e) => setTone(e.target.value)} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleCreate} isLoading={loading}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
