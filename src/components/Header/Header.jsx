"use client";

import React, { useState } from "react";
import {
  Button,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";
import { IoMenu } from "react-icons/io5";

export default function Header({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex overflow={"hidden"} h={"100vh"}>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Flex flexDirection={"column"} w={"100%"}>
        <Flex
          position={"relative"}
          justify={"center"}
          h={"80px"}
          w={"100%"}
          bgColor={"white"}
          align={"center"}
        >
          {isMobile && (
            <IconButton
              position={"absolute"}
              left={5}
              onClick={() => setIsOpen(true)}
              icon={<IoMenu />}
            />
          )}
          <Text>Home</Text>
        </Flex>
        <Flex overflow={"auto"} h={"100%"}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
