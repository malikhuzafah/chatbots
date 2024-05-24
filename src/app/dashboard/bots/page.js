"use client";

import BotCard from "@/components/Bots/BotCard";
import CreateModal from "@/components/Bots/CreateModal";
import DeleteModal from "@/components/Bots/DeleteModal";
import DetailsModal from "@/components/Bots/DetailsModal";
import EditModal from "@/components/Bots/EditModal";
import { BASE_URL } from "@/constants/constants";
import {
  Flex,
  useDisclosure,
  Spinner,
  Image,
  useToast,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";

const Bots = () => {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const toast = useToast();

  const wordLimit = 30;

  const getBots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}api/bots`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setLoading(false);
      setBots(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getBots();
  }, [refresh]);

  const deleteBot = async (bot) => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete(`${BASE_URL}api/bots/${bot._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response);
      alert("bot deleted");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
    setDeleteLoading(false);
  };

  const handleShowMore = (bot) => {
    setSelectedBot(bot);
    onOpen();
  };

  const truncateDescription = (text) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : text;
  };

  return (
    <Flex py={4} h={"100%"} overflow={"auto"} width={"100%"}>
      {loading ? (
        <Flex
          width={"100%"}
          height={"100%"}
          justify={"center"}
          align={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Flex
          flexWrap={"wrap"}
          gap={5}
          // justify={"center"}
          width={"100%"}
          mb={10}
          pb={10}
          px={10}
        >
          {bots.length > 0 ? (
            bots.map((bot, index) => (
              <BotCard
                bot={bot}
                setDeleteModalOpen={setDeleteModalOpen}
                setEditModalOpen={setEditModalOpen}
                setSelectedBot={setSelectedBot}
                handleShowMore={handleShowMore}
                key={index}
              />
            ))
          ) : (
            <Flex
              width={"100%"}
              height={"100%"}
              justify={"center"}
              align={"center"}
            >
              <Flex
                h={300}
                w={400}
                bgColor={"#ffffff"}
                borderRadius={10}
                justify={"center"}
                align={"center"}
                flexDir={"column"}
                gap={3}
              >
                <Image h={50} w={50} src="/images/no-bots.png" />
                <Text>You have not yet created any bot!</Text>
                <Button
                  onClick={() => setIsCreate(true)}
                  rightIcon={<BsStars />}
                  borderRadius={"full"}
                  bg={"linear-gradient(to right, #4568dc, #b06ab3)"}
                  color={"#ffffff"}
                  fontWeight={"400"}
                  _hover={{
                    bg: "linear-gradient(to right, #6a11cb, #2575fc)",
                  }}
                  transition={"background 0.3s ease"}
                >
                  Create Bot
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      )}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedBot={selectedBot}
      />
      <EditModal
        setRefresh={setRefresh}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        bot={selectedBot}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        handleDelete={() => {
          deleteBot(selectedBot);
        }}
        isLoading={deleteLoading}
      />
      <CreateModal isOpen={isCreate} onClose={() => setIsCreate(false)} />
    </Flex>
  );
};

export default Bots;
