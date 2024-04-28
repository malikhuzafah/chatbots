import React from "react";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, active, navSize, link }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          href={link}
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
