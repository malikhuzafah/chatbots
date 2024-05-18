"use client";

import React, { useEffect, useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";
import { IoMenu } from "react-icons/io5";

export default function Header({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let loc = window.location.href.split("/");
    setTitle(loc[loc.length - 1] === "dashboard" ? "Dashboard" : "Bots");
  }, []);

  return (
    <Flex overflow={"hidden"} h={"100vh"}>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Flex flexDirection={"column"} w={"100%"}>
        <Flex
          position={"relative"}
          px={10}
          h={"80px"}
          w={"100%"}
          align={"center"}
          bgColor={"#1b1b1c"}
          gap={5}
        >
          <IconButton
            isRound
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsOpen(true)}
            bg={"linear-gradient(to right, #4568dc, #b06ab3)"}
            icon={<IoMenu />}
            color={"#ffffff"}
            _hover={{
              bg: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
          />
          <Text fontSize={"28px"} fontWeight={400} color={"#ffffff"}>
            {title}
          </Text>
        </Flex>
        <Flex overflow={"auto"} h={"100%"} bgColor={"#101014"}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
