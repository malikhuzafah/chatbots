"use client";

import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { GoDependabot } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";

export default function Dashboard() {
  const [bots, setBots] = useState(0);
  const [messages, setMessages] = useState(0);

  const getStats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/dashboard/stats`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response);
      setBots(response.data.bots);
      setMessages(response.data.messages);
    } catch (err) {
      console.log("Error", err.message);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Flex w={"100%"} flexDirection={"column"} p={10}>
      <Flex flexDirection={"column"} gap={5}>
        <Flex gap={5} flexWrap={"wrap"}>
          <DashboardCard
            title={"No. of Bots created"}
            subtitle={bots}
            icon={GoDependabot}
          />
          <DashboardCard
            title={"No. of Messages"}
            subtitle={messages}
            icon={IoChatbubblesOutline}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
