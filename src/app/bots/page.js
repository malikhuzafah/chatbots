"use client";

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
    // const initialBots = [
    //   {
    //     id: 1,
    //     name: "Customer Support Bot",
    //     description: "Answers common customer queries",
    //   },
    //   {
    //     id: 2,
    //     name: "Lead Generation Bot",
    //     description: "Qualifies leads and schedules demos",
    //   },
    //   {
    //     id: 3,
    //     name: "Feedback Bot",
    //     description: "Collects user feedback for product improvement",
    //   },
    //   {
    //     id: 4,
    //     name: "Customer Support Bot",
    //     description: "Answers common customer queries",
    //   },
    //   {
    //     id: 5,
    //     name: "Lead Generation Bot",
    //     description: "Qualifies leads and schedules demos",
    //   },
    //   {
    //     id: 6,
    //     name: "Feedback Bot",
    //     description: "Collects user feedback for product improvement",
    //   },
    //   {
    //     id: 7,
    //     name: "Customer Support Bot",
    //     description: "Answers common customer queries",
    //   },
    //   {
    //     id: 8,
    //     name: "Lead Generation Bot",
    //     description: "Qualifies leads and schedules demos",
    //   },
    //   {
    //     id: 9,
    //     name: "Feedback Bot",
    //     description: "Collects user feedback for product improvement",
    //   },
    // ];
    // setBots(initialBots);
  }, []);

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
              <VStack spacing={1}>
                <IconButton variant="ghost" icon={<AiOutlineEdit />} />
                <IconButton
                  variant="ghost"
                  icon={<AiOutlineDelete />}
                  onClick={() => {}}
                />
              </VStack>
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
