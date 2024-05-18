"use client";

import BotCard from "@/components/Bots/BotCard";
import DeleteModal from "@/components/Bots/DeleteModal";
import DetailsModal from "@/components/Bots/DetailsModal";
import EditModal from "@/components/Bots/EditModal";
import { BASE_URL } from "@/constants/constants";
import { Flex, useDisclosure, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Bots = () => {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const deleteBot = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}api/bots/${id}`, {
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
          justify={"center"}
          width={"100%"}
          mb={10}
          pb={10}
        >
          {bots.map((bot, index) => (
            <BotCard
              bot={bot}
              setDeleteModalOpen={setDeleteModalOpen}
              setEditModalOpen={setEditModalOpen}
              setSelectedBot={setSelectedBot}
              handleShowMore={handleShowMore}
              key={index}
            />
          ))}
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
      />
    </Flex>
  );
};

export default Bots;
