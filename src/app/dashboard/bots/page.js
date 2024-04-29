"use client";

import DeleteModal from "@/components/Bots/DeleteModal";
import EditModal from "@/components/Bots/EditModal";
import { BASE_URL } from "@/constants/constants";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Bots = () => {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const wordLimit = 30;

  const getBots = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/bots`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      setBots(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Simulate fetching bots (replace with actual data fetching logic)
  useEffect(() => {
    getBots();
  }, [refresh]);

  const deleteBot = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}api/bots/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response);
      alert("bot deleted");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleShowMore = (bot) => {
    setSelectedBot(bot);
    onOpen();
  };

  const truncateDescription = (text) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : text;
  };

  return (
    <Box bg="gray.100" p={4} h={"100%"} overflow={"auto"}>
      <Heading fontSize="lg" mb={4}>
        Bots
      </Heading>
      <Flex flexWrap={"wrap"} gap={5}>
        {bots.map((bot) => (
          <Card
            key={bot.id}
            w={isMobile ? "full" : "30%"}
            mb={4}
            bg="white"
            shadow="lg"
            borderRadius="lg"
          >
            <CardHeader py={4} px={4}>
              <Heading fontSize="md">{bot.name}</Heading>
            </CardHeader>
            <CardBody px={4} py={2}>
              <Text isTruncated={true}>
                {truncateDescription(bot.description)}
              </Text>
              {bot.description.length > wordLimit && (
                <Button
                  variant="link"
                  size="xs"
                  onClick={() => handleShowMore(bot)}
                >
                  Show More
                </Button>
              )}
            </CardBody>
            <CardFooter
              display="flex"
              justifyContent="space-between"
              py={3}
              px={4}
            >
              <a href={`/live/${bot._id}`}>
                <Button
                  rightIcon={<AiOutlineEye />}
                  variant="outline"
                  colorScheme="teal"
                >
                  Live Preview
                </Button>
              </a>
              <Flex spacing={1}>
                <IconButton
                  variant="ghost"
                  icon={<AiOutlineEdit />}
                  onClick={() => {
                    setSelectedBot(bot);
                    setEditModalOpen(true);
                  }}
                />
                <EditModal
                  isOpen={editModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  bot={selectedBot}
                />
                <IconButton
                  variant="ghost"
                  icon={<AiOutlineDelete />}
                  onClick={() => setDeleteModalOpen(true)}
                />
                <DeleteModal
                  isOpen={deleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  handleDelete={() => {
                    deleteBot(bot._id);
                  }}
                />
              </Flex>
            </CardFooter>
            <Modal isOpen={isOpen} onClose={onClose}>
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
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Bots;
