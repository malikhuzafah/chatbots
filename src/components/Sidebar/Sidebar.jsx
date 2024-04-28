import React from "react";
import {
  Avatar,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavItem from "./NavItem";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";

export default function Sidebar({ isOpen, onClose }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : (
    <Flex
      pos="sticky"
      zIndex={"1000"}
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={"300px"}
      flexDir="column"
      justifyContent="space-between"
      overflow={"hidden"}
    >
      <Flex p="5%" flexDir="column" w="100%" as="nav">
        <NavItem
          navSize={"large"}
          icon={FiHome}
          title="Dashboard"
          description="This is the description for the dashboard."
          link={"/"}
          active
        />

        <NavItem
          navSize={"large"}
          icon={FiCalendar}
          title="Your Bots"
          link={"/bots"}
        />
        <NavItem navSize={"large"} icon={FiUser} title="Create Bot" />
        <NavItem navSize={"large"} icon={IoPawOutline} title="Animals" />
        <NavItem navSize={"large"} icon={FiDollarSign} title="Stocks" />
        <NavItem navSize={"large"} icon={FiBriefcase} title="Reports" />
        <NavItem navSize={"large"} icon={FiSettings} title="Settings" />
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" mb={4}>
        <Divider />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex flexDir="column" ml={4}>
            <Heading as="h3" size="sm">
              Sylwia Weller
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
