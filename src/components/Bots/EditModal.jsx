import { BASE_URL } from "@/constants/constants";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ({ isOpen, onClose, bot, setRefresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(bot?.name);
    setDescription(bot?.description);
    setTone(bot?.tone);
  }, [bot]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}api/bots/${bot?._id}`,
        { name, description, tone },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      console.log(response);
      setRefresh((prev) => !prev);
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Edit Modal</Text>
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
          <Button variant="ghost" onClick={handleUpdate} isLoading={loading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
