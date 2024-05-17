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
  Spinner,
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
  const [loading, setLoading] = useState(false);

  const wordLimit = 30;

  const getBots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}api/bots`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setLoading(false);
      setBots(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
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
    <Flex bg="gray.100" py={4} h={"100%"} overflow={"auto"} width={"100%"}>
      {/* <Box bg="gray.100" p={4} h={"100%"} overflow={"auto"}> */}
      {/* <Heading fontSize="lg" mb={4}>
        Bots
      </Heading> */}
      {loading ? (
        <Flex
          width={"100%"}
          height={"100%"}
          justify={"center"}
          align={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Flex
          flexWrap={"wrap"}
          gap={5}
          justify={"center"}
          width={"100%"}
          mb={10}
          pb={10}
        >
          {/* {bots.map((bot) => (
            <Flex
              key={bot.id}
              w={isMobile ? "full" : "30%"}
              // mb={4}
              bg="white"
              shadow="lg"
              borderRadius="lg"
              p={5}
              flexDir={"column"}
            >
              <Text fontSize="lg" fontWeight={500}>
                {bot.name}
              </Text>
              <Flex>
                <Text fontWeight={500}>Tone: </Text>
                <Text ml={1}>{bot.tone} </Text>
              </Flex>
              <Text isTruncated={true} color={"gray.800"}>
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
            </Flex>
          ))} */}
          {bots.map((bot) => (
            <Card
              key={bot.id}
              w={isMobile ? "full" : "30%"}
              // mb={4}
              bg="white"
              shadow="lg"
              borderRadius="lg"
            >
              <CardHeader py={4} px={4}>
                <Text fontSize="lg" fontWeight={500}>
                  {bot.name}
                </Text>
              </CardHeader>
              <CardBody px={4} py={2}>
                <Text mb={2}>
                  <span
                    style={{
                      fontWeight: "550",
                    }}
                  >
                    Tone:{" "}
                  </span>
                  {bot.tone}
                </Text>
                <Text>
                  {bot.description.length > 100
                    ? bot.description.slice(0, 100) + "..."
                    : bot.description}
                </Text>
                {/* <Text isTruncated={true}>
                  {truncateDescription(bot.description)}
                </Text>
                */}
                {bot.description.length > 100 && (
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
                    borderRadius={"full"}
                  >
                    Live Preview
                  </Button>
                </a>
                <Flex gap={1}>
                  <IconButton
                    // variant="ghost"
                    bgColor={"blue.500"}
                    isRound
                    icon={<AiOutlineEdit color="white" fontSize={"20px"} />}
                    onClick={() => {
                      setSelectedBot(bot);
                      setEditModalOpen(true);
                    }}
                  />

                  <IconButton
                    // variant="ghost"
                    bgColor={"red.500"}
                    isRound
                    icon={<AiOutlineDelete color="white" fontSize={"20px"} />}
                    onClick={() => {
                      setSelectedBot(bot);
                      setDeleteModalOpen(true);
                    }}
                  />
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      )}
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
      <EditModal
        setRefresh={setRefresh}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        bot={selectedBot}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        handleDelete={() => {
          deleteBot(selectedBot);
        }}
      />
      {/* </Box> */}
    </Flex>
  );
};

export default Bots;
