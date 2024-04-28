// import React, { useState, useEffect } from "react";
// import { Flex } from "@chakra-ui/react";
// import axios from "axios";

// export default function Chat({ botId }) {
//   const [chat, setChat] = useState([]);
//   const [message, setMessage] = useState("");

//   const sendMessage = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/conversations",
//         {
//           botId,
//           message,
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMessages = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/conversations/${botId}`
//       );
//       setChat(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMessages();
//   }, []);

//   return <Flex></Flex>;
// }

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  Button,
  useBreakpointValue,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { AnimatePresence, color, motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";

const Chat = ({ botId }) => {
  const [messages, setMessages] = useState([]);
  const [singleMessage, setSingleMessage] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/conversations/${"662d6c2fb95eb989669af775"}`,
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      const tempMessages = response.data;
      setMessages(tempMessages.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    <Flex flexDir={"column"} h={"100%"} px={10} pb={10} overflow={"hidden"}>
      <Flex h={"95%"} flexDirection={"column"}>
        <Flex justify={"center"} w={"100%"} position={"relative"} p={5}>
          <IconButton
            isRound
            icon={<IoMdArrowBack />}
            position={"absolute"}
            left={5}
          />

          <Heading as="h3" size="lg">
            Chat bot Name
          </Heading>
        </Flex>
        <Flex
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
      <Flex>
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
};

export default Chat;
