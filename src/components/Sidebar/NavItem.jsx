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
          background={active && "linear-gradient(to right, #4568dc, #b06ab3)"}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            background: "linear-gradient(to right, #4568dc, #b06ab3)",
            color: "#ffffff",
          }}
          w={navSize == "large" && "100%"}
          color={"#ffffff"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
