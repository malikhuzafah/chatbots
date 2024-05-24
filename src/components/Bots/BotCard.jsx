import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { GoDependabot } from "react-icons/go";

export default function BotCard({
  bot,
  setSelectedBot,
  setEditModalOpen,
  setDeleteModalOpen,
  handleShowMore,
}) {
  return (
    <Card
      key={bot.id}
      w={{ base: "full", md: "30%" }}
      //   bg="linear-gradient(to right, #f2eee9, #cce7e8)"
      //   bg="linear-gradient(to right, #4568dc, #b06ab3)"
      //   bg="linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)"
      bg="linear-gradient(to right, #232526, #414345)"
      shadow="lg"
      borderRadius="lg"
      color={"#ffffff"}
      maxH={"250px"}
    >
      <CardHeader py={4} px={4}>
        <Flex justify={"space-between"} align={"center"}>
          <Text fontSize="lg" fontWeight={500}>
            {bot.name}
          </Text>
          <IconButton
            color={"white"}
            borderRadius={"full"}
            aria-label="AI Icon Button"
            icon={<GoDependabot />}
            bg={"linear-gradient(to right, #4e54c8, #8f94fb)"}
            _hover={{}}
          />
        </Flex>
      </CardHeader>
      <CardBody px={4} py={2}>
        <Text mb={2}>
          <span
            style={{
              fontWeight: "550",
            }}
          >
            Tone:{" "}
          </span>
          {bot.tone}
        </Text>
        <Text>
          {bot.description.length > 100
            ? bot.description.slice(0, 100) + "..."
            : bot.description}
        </Text>
        {bot.description.length > 100 && (
          <Button variant="link" size="xs" onClick={() => handleShowMore(bot)}>
            Show More
          </Button>
        )}
      </CardBody>
      <CardFooter display="flex" justifyContent="space-between" py={3} px={4}>
        <a href={`/live/${bot._id}`}>
          <Button
            rightIcon={<BsStars />}
            borderRadius={"full"}
            bg={"linear-gradient(to right, #4568dc, #b06ab3)"}
            color={"#ffffff"}
            fontWeight={"400"}
            _hover={{
              //   bg: "linear-gradient(to right, #383838, #4c4c4c)",
              bg: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
            transition={"background 0.3s ease"}
          >
            Live Preview
          </Button>
        </a>
        <Flex gap={1}>
          <IconButton
            transition={"0.5s ease"}
            bg={"linear-gradient(to right, #4CAF50, #8BC34A)"}
            _hover={{
              bg: "linear-gradient(to right, #388E3C, #66BB6A)",
            }}
            isRound
            icon={<AiOutlineEdit color="white" fontSize={"20px"} />}
            onClick={() => {
              setSelectedBot(bot);
              setEditModalOpen(true);
            }}
          />

          <IconButton
            bg={"linear-gradient(to right, #F44336, #E57373)"}
            _hover={{
              bg: "linear-gradient(to right, #D32F2F, #EF5350)",
            }}
            isRound
            icon={<AiOutlineDelete color="white" fontSize={"20px"} />}
            onClick={() => {
              setSelectedBot(bot);
              setDeleteModalOpen(true);
            }}
          />
        </Flex>
      </CardFooter>
    </Card>
  );
}
