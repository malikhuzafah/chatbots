import Header from "@/components/Header/Header";
import { Flex } from "@chakra-ui/react";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <Flex flexDirection={"column-reverse"}>
      <Header>{children}</Header>
    </Flex>
  );
}
