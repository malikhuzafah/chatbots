"use client";
import { BASE_URL } from "@/constants/constants";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";

export default function BotDetails({ params }) {
  const [botDetails, setBotDetails] = useState({});
  const [singleMessage, setSingleMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const getBotDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/bots/${params.botId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setBotDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/conversations/${params.botId}`,
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      const tempMessages = response.data;
      setMessages(tempMessages.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBotDetails();
    getMessages();
  }, []);

  const sendMessage = async () => {
    try {
      if (!singleMessage) return;
      const response = await axios.post(
        `${BASE_URL}api/conversations`,
        {
          botId: "662d6c2fb95eb989669af775",
          message: singleMessage,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setMessages((prevMessages) => [response.data, ...prevMessages]);
      setSingleMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      // px={10}
      pb={10}
      w={"100%"}
      overflow={"hidden"}
      bgColor={"gray.100"}
    >
      <Flex h={"95%"} flexDirection={"column"}>
        <Flex
          justify={"center"}
          w={"100%"}
          position={"relative"}
          p={5}
          bgColor={"white"}
          px={10}
        >
          <IconButton
            isRound
            icon={<IoMdArrowBack />}
            position={"absolute"}
            left={5}
            onClick={goBack}
          />

          <Heading as="h3" size="lg">
            {botDetails.name}
          </Heading>
        </Flex>
        <Flex
          px={10}
          h={"100%"}
          flexDirection={"column-reverse"}
          overflow={"auto"}
          mb={10}
        >
          <AnimatePresence initial={false} mode="wait">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={messageVariants}
              >
                <Flex justifyContent={"flex-end"} px={4} py={2}>
                  <Box
                    bg={"green.500"}
                    color="white"
                    p={2}
                    px={5}
                    borderRadius="25px"
                    maxWidth={isMobile ? "200px" : "70%"}
                  >
                    {message.message}
                  </Box>
                </Flex>
                <Flex justifyContent={"flex-start"} px={4} py={2}>
                  <Box
                    bg={"blue.500"}
                    color="white"
                    p={2}
                    px={5}
                    borderRadius="25px"
                    maxWidth={isMobile ? "200px" : "70%"}
                  >
                    {message.response}
                  </Box>
                </Flex>
              </motion.div>
            ))}
          </AnimatePresence>
        </Flex>
      </Flex>
      <Flex px={10}>
        <InputGroup size="lg" onSubmit={sendMessage}>
          <Input
            pr="4.5rem"
            type="text"
            borderRadius={"full"}
            placeholder="Enter Message ..."
            value={singleMessage}
            onChange={(e) => {
              setSingleMessage(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <IconButton isRound icon={<IoMdSend />} onClick={sendMessage} />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
