import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

export default function DashboardCard({ title, subtitle, icon }) {
  return (
    <Flex
      bg={"linear-gradient(to right, #f2eee9, #cce7e8)"}
      w={"250px"}
      borderRadius={"10px"}
      h={"150px"}
      justify={"center"}
    >
      <Flex flexDirection={"column"} align={"center"} p={5} justify={"center"}>
        <Icon as={icon} fontSize={35} />
        <Text fontSize={"xl"} fontWeight={"450"}>
          {title}
        </Text>
        <Text fontSize={"24"} color={"black"}>
          {subtitle}
        </Text>
      </Flex>
    </Flex>
  );
}
