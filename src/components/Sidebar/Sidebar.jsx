"use client";

import React, { useEffect, useState } from "react";
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
  Icon,
  Link,
  Menu,
  MenuButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavItem from "./NavItem";
import { FiHome } from "react-icons/fi";
import { RiLogoutCircleRLine, RiRobot3Line } from "react-icons/ri";
import { TiUserAddOutline } from "react-icons/ti";
import CreateModal from "../Bots/CreateModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";

const routes = [
  { name: "Dashboard", link: "/dashboard", icon: FiHome },
  { name: "My bots", link: "/dashboard/bots", icon: RiRobot3Line },
];

export default function Sidebar({ isOpen, onClose }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState("");

  const router = useRouter();

  const getProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/users/profile`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return isMobile ? (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Bots</DrawerHeader>
        <DrawerBody>
          <Flex p="5%" flexDir="column" w="100%" as="nav">
            {routes.map((route, i) => (
              <NavItem
                key={i}
                navSize={"large"}
                icon={route.icon}
                title={route.name}
                link={route.link}
                active={currentPath === route.link}
              />
            ))}
            <Flex mt={30} flexDir="column" w="100%" alignItems={"flex-start"}>
              <Menu placement="right">
                <Link
                  onClick={() => setCreateModalOpen(true)}
                  p={3}
                  borderRadius={8}
                  _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
                  w={"100%"}
                >
                  <MenuButton w="100%">
                    <Flex>
                      <Icon
                        as={TiUserAddOutline}
                        fontSize="xl"
                        color={"gray.500"}
                      />
                      <Text ml={5}>Create Bot</Text>
                    </Flex>
                  </MenuButton>
                </Link>
              </Menu>
            </Flex>
            <Flex mt={30} flexDir="column" w="100%" alignItems={"flex-start"}>
              <Menu placement="right">
                <Link
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.replace("/auth");
                  }}
                  p={3}
                  borderRadius={8}
                  _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
                  w={"100%"}
                >
                  <MenuButton w="100%">
                    <Flex>
                      <Icon
                        as={RiLogoutCircleRLine}
                        fontSize="xl"
                        color={"gray.500"}
                      />
                      <Text ml={5}>Logout</Text>
                    </Flex>
                  </MenuButton>
                </Link>
              </Menu>
            </Flex>
          </Flex>

          <Flex p="5%" flexDir="column" w="100%" mb={4}>
            <Divider />
            <Flex mt={4} align="center">
              <Avatar size="sm" src="avatar-1.jpg" />
              <Flex flexDir="column" ml={4}>
                <Heading as="h3" size="sm">
                  {user?.name}
                </Heading>
                <Text color="gray">{user?.email}</Text>
              </Flex>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : (
    <Flex
      pos="sticky"
      zIndex={"1000"}
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      minW={"250px"}
      w={"300px"}
      flexDir="column"
      justifyContent="space-between"
      overflow={"hidden"}
    >
      <Flex p="5%" flexDir="column" w="100%" as="nav">
        {routes.map((route, i) => (
          <NavItem
            key={i}
            navSize={"large"}
            icon={route.icon}
            title={route.name}
            link={route.link}
            active={currentPath === route.link}
          />
        ))}
        <Flex mt={30} flexDir="column" w="100%" alignItems={"flex-start"}>
          <Menu placement="right">
            <Link
              onClick={() => setCreateModalOpen(true)}
              p={3}
              borderRadius={8}
              _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
              w={"100%"}
            >
              <MenuButton w="100%">
                <Flex>
                  <Icon
                    as={TiUserAddOutline}
                    fontSize="xl"
                    color={"gray.500"}
                  />
                  <Text ml={5}>Create Bot</Text>
                </Flex>
              </MenuButton>
            </Link>
          </Menu>
        </Flex>
        <Flex mt={30} flexDir="column" w="100%" alignItems={"flex-start"}>
          <Menu placement="right">
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                router.replace("/auth");
              }}
              p={3}
              borderRadius={8}
              _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
              w={"100%"}
            >
              <MenuButton w="100%">
                <Flex>
                  <Icon
                    as={RiLogoutCircleRLine}
                    fontSize="xl"
                    color={"gray.500"}
                  />
                  <Text ml={5}>Logout</Text>
                </Flex>
              </MenuButton>
            </Link>
          </Menu>
        </Flex>
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" mb={4}>
        <Divider />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex flexDir="column" ml={4}>
            <Heading as="h3" size="sm">
              {user?.name}
            </Heading>
            <Text color="gray">{user?.email}</Text>
          </Flex>
        </Flex>
      </Flex>

      <CreateModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </Flex>
  );
}
