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
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import { BsStars } from "react-icons/bs";

export default function BotDetails({ params }) {
  const [botDetails, setBotDetails] = useState({});
  const [singleMessage, setSingleMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
          botId: params.botId,
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
      pb={10}
      w={"100%"}
      overflow={"hidden"}
      bgColor={"#101014"}
    >
      <Flex h={"95%"} flexDirection={"column"}>
        <Flex
          justify={"space-between"}
          w={"100%"}
          position={"relative"}
          p={5}
          bgColor={"#1b1b1c"}
          px={10}
        >
          <IconButton
            isRound
            icon={<IoMdArrowBack />}
            onClick={goBack}
            bg={"linear-gradient(to right, #4e54c8, #8f94fb)"}
            color={"#ffffff"}
            _hover={{
              bg: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
          />

          <Heading size="lg" color={"#ffffff"} fontWeight={"500"}>
            {botDetails.name}
          </Heading>
          <IconButton
            color={"white"}
            borderRadius={"full"}
            aria-label="AI Icon Button"
            icon={<BsStars />}
            bg={"linear-gradient(to right, #4e54c8, #8f94fb)"}
            _hover={{}}
          />
        </Flex>
        <Flex
          px={{ base: 10, md: 20 }}
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
                    bg={"linear-gradient(to right, #383838, #4c4c4c)"}
                    color="white"
                    p={2}
                    px={5}
                    borderRadius="25px"
                    maxWidth={{ base: "200px", md: "70%" }}
                  >
                    {message.message}
                  </Box>
                </Flex>
                <Flex justifyContent={"flex-start"} px={4} py={2}>
                  <Box
                    bg={"linear-gradient(to right, #4e54c8, #8f94fb)"}
                    color="white"
                    p={2}
                    px={5}
                    borderRadius="25px"
                    maxWidth={{ base: "200px", md: "70%" }}
                  >
                    {message.response}
                  </Box>
                </Flex>
              </motion.div>
            ))}
          </AnimatePresence>
        </Flex>
      </Flex>
      <Flex px={{ base: 10, md: 20 }}>
        <InputGroup size="lg" onSubmit={sendMessage}>
          <Input
            pr="4.5rem"
            type="text"
            borderRadius={"full"}
            placeholder="Enter Message..."
            value={singleMessage}
            onChange={(e) => {
              setSingleMessage(e.target.value);
            }}
            bgColor={"#ffffff"}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              isRound
              icon={<IoMdSend />}
              onClick={sendMessage}
              bg="linear-gradient(to right, #383838, #4c4c4c)"
              color={"#ffffff"}
              _hover={{
                bg: "linear-gradient(to right, #4e54c8, #8f94fb)",
              }}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
