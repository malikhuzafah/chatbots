"use client";

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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

export default function CreateModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
      onClose();
      let loc = window.location.href.split("/");
      if (loc[loc.length - 1] === "bots") {
        router.refresh();
      } else {
        router.push("/dashboard/bots");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} size={"lg"} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"#414345"} color={"#ffffff"}>
        <ModalHeader fontWeight={"450"}>
          Create Bot
          <ModalCloseButton
            borderRadius={"full"}
            _hover={{
              bg: "linear-gradient(to right, #4e54c8, #8f94fb)",
              color: "white",
            }}
          />
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection={"column"} gap={4}>
            <FormControl>
              <FormLabel fontWeight={"450"}>Name:</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                bgColor={"#ffffff"}
                color={"#000000"}
                placeholder="Enter Name"
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"450"}>Description:</FormLabel>
              <Textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                bgColor={"#ffffff"}
                color={"#000000"}
                placeholder="Enter Description"
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"450"}>Tone:</FormLabel>
              <Input
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                bgColor={"#ffffff"}
                color={"#000000"}
                placeholder="Enter Tone"
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            bg={"linear-gradient(to right, #F44336, #E57373)"}
            _hover={{
              bg: "linear-gradient(to right, #D32F2F, #EF5350)",
            }}
            fontWeight={"400"}
            borderRadius={"full"}
            leftIcon={<IoCloseOutline size={20} />}
          >
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={handleCreate}
            isLoading={loading}
            borderRadius={"full"}
            bg={"linear-gradient(to right, #4568dc, #b06ab3)"}
            color={"#ffffff"}
            fontWeight={"400"}
            _hover={{
              bg: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
            rightIcon={<BsStars size={16} />}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
