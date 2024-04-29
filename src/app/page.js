"use client";

import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, []);

  return <Flex></Flex>;
}
